import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import useLoginMutation from "../../libs/hooks/useLoginMutation";
import userEvent from "@testing-library/user-event";
import Login from "../../ui/LoginForm/Login";

// hooks 목업
jest.mock("../../libs/hooks/useLoginMutation");

// 네비게이션 목업
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("로그인 컴포넌트", () => {
  const mockMutate = jest.fn();
  beforeEach(() => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  describe("렌더링", () => {
    it("모든 입력 필드와 버튼이 렌더링 되어야 함", () => {
      renderLogin();
      expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
      expect(screen.getByText("로그인")).toBeInTheDocument();
      expect(screen.getByText("계정이 없으신가요?")).toBeInTheDocument();
      expect(screen.getByText("가입하기")).toBeInTheDocument();
    });
  });

  describe("입력 필드", () => {
    it("이메일 입력 필드 변경시 상태가 업데이트되어야 함", async () => {
      renderLogin();
      const emailInput = screen.getByPlaceholderText("이메일");
      await userEvent.type(emailInput, "test@example.com");
      expect(emailInput).toHaveValue("test@example.com");
    });
    it("비밀번호 입력 필드 변경시 상태가 업데이트되어야 함", async () => {
      renderLogin();
      const passwordInput = screen.getByPlaceholderText("비밀번호");
      await userEvent.type(passwordInput, "Password123");
      expect(passwordInput).toHaveValue("Password123");
    });
  });
  describe("폼 유효성 검사", () => {
    it("유효하지 않는 데이터로 로그인 시도 시 에러 메시지 표시", async () => {
      renderLogin();
      const submitButton = screen.getByText("로그인");

      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText("이메일을 입력해주세요")).toBeInTheDocument();
        expect(screen.getByText("비밀번호를 입력해주세요")).toBeInTheDocument();
      });
      expect(mockMutate).not.toHaveBeenCalled();
    });
    it("입력값 변경 시 해당 필드의 에러 메시지가 사라져야 함", async () => {
      renderLogin();
      const submitButton = screen.getByText("로그인");
      // 먼저 에러 메시지 표시
      await userEvent.click(submitButton);

      // 이메일 입력
      const emailInput = screen.getByPlaceholderText("이메일");
      await userEvent.type(emailInput, "test@example.com");
      expect(
        screen.queryByText("이메일을 입력해주세요")
      ).not.toBeInTheDocument();
    });
  });
  describe("로그인 제출", () => {
    it("유효한 데이터로 회원가입 시도 시 mutation 호출", async () => {
      renderLogin();
      const emailInput = screen.getByPlaceholderText("이메일");
      const passwordInput = screen.getByPlaceholderText("비밀번호");
      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "Password123");
      const submitButton = screen.getByText("로그인");
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "Password123",
        });
      });
    });
    it("mutation 에러 발생 시 에러 메시지 표시", async () => {
      const errorMessage = "로그인에 실패했습니다.";

      // onError 콜백을 구현한 mock mutate 함수
      const mockMutate = jest.fn().mockImplementation(() => {
        // mutate 호출 후 에러 상태로 업데이트
        (useLoginMutation as jest.Mock).mockReturnValue({
          mutate: mockMutate,
          isLoading: false,
          error: new Error(errorMessage),
        });
      });
      // 초기 상태 설정
      (useLoginMutation as jest.Mock).mockReturnValue({
        mutate: mockMutate,
        isLoading: false,
        error: null,
      });

      const { rerender } = renderLogin();

      // 폼 입력
      await userEvent.type(
        screen.getByPlaceholderText("이메일"),
        "test@example.com"
      );
      await userEvent.type(
        screen.getByPlaceholderText("비밀번호"),
        "Password123"
      );

      // 제출 버튼 클릭
      await userEvent.click(screen.getByText("로그인"));

      // mock이 호출되었는지 확인
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123",
      });

      // 컴포넌트 리렌더링
      rerender(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      // 에러 메시지 확인
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});
