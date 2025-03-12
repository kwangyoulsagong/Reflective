import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostView from "../ui/Post/Post";
import { PostValidation } from "../libs/validation/Post";
import { Block } from "@/entities/BlockEditor/model/type/BlockEditor";

jest.mock("../api/Post/likes/useGetLike", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ result: { is_liked: false } })),
}));

jest.mock("@/shared/BlockView/ui/BlockView", () => {
  return function MockBlockView({ block }: { block: Block }) {
    return <div data-testid="block-view">{block.content}</div>;
  };
});
jest.mock("prismjs", () => ({
  highlight: jest.fn((code) => code),
  languages: {
    javascript: {},
  },
}));

// Test setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe("PostView", () => {
  const mockValidBlocks: Block[] = [
    { id: "1", type: "paragraph", content: "첫 번째 블록" },
    { id: "2", type: "code", content: "두 번째 블록" },
  ];

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe("렌더링 테스트", () => {
    it("제목이 올바르게 렌더링되어야 한다", () => {
      customRender(<PostView />);

      const title = screen.getByText("테스트 제목");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass(
        "text-3xl",
        "md:text-4xl",
        "lg:text-[50px]",
        "font-bold"
      );
    });

    it("article이 올바른 width 클래스를 가져야 한다", () => {
      customRender(<PostView />);
      const articleContent = screen.getByRole("article").querySelector("div");
      expect(articleContent).toHaveClass("w-[375px]", "md:w-[750px]");
    });
  });

  describe("validation 테스트", () => {
    it("validation이 성공하면 블록들이 렌더링되어야 한다", async () => {
      jest.spyOn(PostValidation.prototype, "isValidation").mockReturnValue({
        isValid: true,
        contents: mockValidBlocks,
      });

      customRender(<PostView />);

      await waitFor(() => {
        const blocks = screen.getAllByTestId("block-view");
        expect(blocks).toHaveLength(2);
        expect(blocks[0]).toHaveTextContent("첫 번째 블록");
        expect(blocks[1]).toHaveTextContent("두 번째 블록");
      });
    });

    it("validation이 실패하면 에러가 기록되어야 한다", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      jest.spyOn(PostValidation.prototype, "isValidation").mockReturnValue({
        isValid: false,
        isError: "검증 실패",
      });

      customRender(<PostView />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("검증 실패");
        expect(screen.queryAllByTestId("block-view")).toHaveLength(0);
      });

      consoleSpy.mockRestore();
    });
  });

  describe("데이터 업데이트 테스트", () => {
    it("contents가 변경되면 블록이 업데이트되어야 한다", async () => {
      const validationSpy = jest
        .spyOn(PostValidation.prototype, "isValidation")
        .mockReturnValue({
          isValid: true,
          contents: mockValidBlocks,
        });

      const { rerender } = customRender(<PostView />);

      validationSpy.mockReturnValue({
        isValid: true,
        contents: [
          { id: "1", type: "paragraph", content: "업데이트된 블록" } as Block,
        ],
      });

      rerender(<PostView />);

      await waitFor(() => {
        const blocks = screen.getAllByTestId("block-view");
        expect(blocks).toHaveLength(1);
        expect(blocks[0]).toHaveTextContent("업데이트된 블록");
      });
    });
  });

  describe("반응형 스타일 테스트", () => {
    it("컨테이너가 올바른 반응형 클래스를 가져야 한다", () => {
      customRender(<PostView />);

      const container = screen.getByRole("article").parentElement;
      expect(container).toHaveClass(
        "mt-8",
        "md:mt-16",
        "lg:mt-20",
        "w-full",
        "md:w-[900px]"
      );
    });
  });
});
