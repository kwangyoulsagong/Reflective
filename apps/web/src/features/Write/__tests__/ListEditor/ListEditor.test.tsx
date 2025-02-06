import { fireEvent, render, screen } from "@testing-library/react";
import ListEditor from "../../ui/BlockEditor/ListEditor/ListEditor";
import { Block } from "@/entities/BlockEditor/model/type/BlockEditor";
import userEvent from "@testing-library/user-event";
describe("ListEditor", () => {
  const mockUpdateBlockContent = jest.fn();
  const mockOnError = jest.fn();
  const mockDebouncedUpdateRef = { current: jest.fn() };

  const defaultProps = {
    block: { id: "tests-block", type: "list" as Block["type"], content: "" },
    blockContent: new Map<string, string>(),
    updateBlockContent: mockUpdateBlockContent,
    debouncedUpdateRef: mockDebouncedUpdateRef,
    onError: mockOnError,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('빈 리스트에 "리스트 아이템..." 인풋이 표시되어야 함', () => {
    render(<ListEditor {...defaultProps} />);
    expect(screen.getByPlaceholderText("리스트 아이템...")).toBeInTheDocument();
  });

  it("기본 리스트 아이템이 추가 되어야 함", () => {
    render(<ListEditor {...defaultProps} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listItem")).toBeInTheDocument();
  });

  //   it("ListItem 컨텐츠 변경 시 handleListItemChange가 호출되어야 함", async () => {
  //     render(<ListEditor {...defaultProps} />);
  //     const input = screen.getByPlaceholderText("리스트 아이템...");
  //     await userEvent.type(input, "test content");
  //     expect(mockUpdateBlockContent).toHaveBeenCalled();
  //   });

  //   it("키보드 이벤트가 올바르게 처리되어야 함", async () => {
  //     render(<ListEditor {...defaultProps} />);
  //     const input = screen.getByPlaceholderText("리스트 아이템...");

  //     await userEvent.type(input, "test{enter}");

  //     expect(mockUpdateBlockContent).toHaveBeenCalled();
  //   });

  //   // 추가적인 키보드 이벤트 테스트도 필요합니다
  //   it("Tab 키로 들여쓰기가 되어야 함", async () => {
  //     render(<ListEditor {...defaultProps} />);
  //     const input = screen.getByPlaceholderText("리스트 아이템...");

  //     await userEvent.type(input, "test"); // 컨텐츠 입력
  //     input.focus();
  //     await userEvent.keyboard("{Tab}");

  //     expect(mockUpdateBlockContent).toHaveBeenCalled();
  //   });

  //   it("Shift+Tab 키로 내어쓰기가 되어야 함", async () => {
  //     render(<ListEditor {...defaultProps} />);
  //     const input = screen.getByPlaceholderText("리스트 아이템...");

  //     await userEvent.type(input, "test"); // 컨텐츠 입력
  //     await userEvent.keyboard("{Tab}"); // 들여쓰기 먼저
  //     input.focus();
  //     await userEvent.keyboard("{Shift>}{Tab}{/Shift}");

  //     expect(mockUpdateBlockContent).toHaveBeenCalled();
  //   });

  //   it("스크롤 시 virtualItems가 업데이트되어야 함", async () => {
  //     render(<ListEditor {...defaultProps} />);
  //     const list = screen.getByRole("list");
  //     fireEvent.scroll(list, { target: { scrollTop: 100 } });
  //     expect(list).toHaveStyle({ height: "100%" });
  //   });
});
