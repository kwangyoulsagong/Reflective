import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../../ui/SignUpForm/SignUp";
import useSignUpMutation from "../../libs/hooks/useSignUpMutation";
import userEvent from "@testing-library/user-event";

// hooks 목업
jest.mock("../../libs/hooks/useSignUpMutation");

// 네비게이션 목업
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("회원가입 컴포넌트", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useSignUpMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => {
    return render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  };

  describe("렌더링", () => {
    it("모든 입력 필드와 버튼이 렌더링 되어야 함", () => {
      renderSignUp();
      expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("닉네임")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("전화번호")).toBeInTheDocument();
      expect(screen.getByText("회원가입")).toBeInTheDocument();
      expect(screen.getByText("계정이 있으신가요?")).toBeInTheDocument();
      expect(screen.getByText("로그인")).toBeInTheDocument();
    });
  });

  describe("입력 필드", () => {
    it("이메일 입력 필드 변경시 상태가 업데이트되어야 함", async () => {
      renderSignUp();
      const emailInput = screen.getByPlaceholderText("이메일");
      await userEvent.type(emailInput, "test@example.com");
      expect(emailInput).toHaveValue("test@example.com");
    });

    it("비밀번호 입력 필드 변경시 상태가 업데이트되어야 함", async () => {
      renderSignUp();
      const passwordInput = screen.getByPlaceholderText("비밀번호");
      await userEvent.type(passwordInput, "Password123");
      expect(passwordInput).toHaveValue("Password123");
    });

    it("닉네임 입력 필드 변경시 상태가 업데이트되어야 함", async () => {
      renderSignUp();
      const nicknameInput = screen.getByPlaceholderText("닉네임");
      await userEvent.type(nicknameInput, "테스트");
      expect(nicknameInput).toHaveValue("테스트");
    });

    it("전화번호 입력 필드 변경시 상태가 업데이트되어야 함", async () => {
      renderSignUp();
      const phoneInput = screen.getByPlaceholderText("전화번호");
      await userEvent.type(phoneInput, "01012345678");
      expect(phoneInput).toHaveValue("01012345678");
    });
  });

  describe("폼 유효성 검사", () => {
    it("유효하지 않은 데이터로 회원가입 시도 시 에러 메시지 표시", async () => {
      renderSignUp();
      const submitButton = screen.getByText("회원가입");

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("이메일을 입력해주세요")).toBeInTheDocument();
        expect(screen.getByText("비밀번호를 입력해주세요")).toBeInTheDocument();
        expect(screen.getByText("닉네임을 입력해주세요")).toBeInTheDocument();
        expect(screen.getByText("전화번호를 입력해주세요")).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });

    it("입력 값 변경 시 해당 필드의 에러 메시지가 사라져야 함", async () => {
      renderSignUp();
      const submitButton = screen.getByText("회원가입");

      // 먼저 에러 메시지 표시
      await userEvent.click(submitButton);

      // 이메일 입력
      const emailInput = screen.getByPlaceholderText("이메일");
      await userEvent.type(emailInput, "test@example.com");
      // 이메일 에러 메시지가 사라졌는지 확인
      expect(
        screen.queryByText("이메일을 입력해주세요")
      ).not.toBeInTheDocument();
    });
  });

  describe("회원가입 제출", () => {
    it("유효한 데이터로 회원가입 시도 시 mutation 호출", async () => {
      renderSignUp();

      const emailInput = screen.getByPlaceholderText("이메일");
      const passwordInput = screen.getByPlaceholderText("비밀번호");
      const nicknameInput = screen.getByPlaceholderText("닉네임");
      const phoneInput = screen.getByPlaceholderText("전화번호");

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "Password123");
      await userEvent.type(nicknameInput, "테스트");
      await userEvent.type(phoneInput, "01012345678");

      const submitButton = screen.getByText("회원가입");
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "Password123",
          nickname: "테스트",
          phone_number: "01012345678",
        });
      });
    });

    it("mutation 에러 발생 시 에러 메시지 표시", async () => {
      const errorMessage = "회원가입에 실패했습니다";

      // onError 콜백을 구현한 mock mutate 함수
      const mockMutate = jest.fn().mockImplementation(() => {
        // mutate 호출 후 에러 상태로 업데이트
        (useSignUpMutation as jest.Mock).mockReturnValue({
          mutate: mockMutate,
          isLoading: false,
          error: new Error(errorMessage),
        });
      });

      // 초기 상태 설정
      (useSignUpMutation as jest.Mock).mockReturnValue({
        mutate: mockMutate,
        isLoading: false,
        error: null,
      });

      const { rerender } = renderSignUp();

      // 폼 입력
      await userEvent.type(
        screen.getByPlaceholderText("이메일"),
        "test@example.com"
      );
      await userEvent.type(
        screen.getByPlaceholderText("비밀번호"),
        "Password123"
      );
      await userEvent.type(screen.getByPlaceholderText("닉네임"), "테스트");
      await userEvent.type(
        screen.getByPlaceholderText("전화번호"),
        "01012345678"
      );

      // 제출 버튼 클릭
      await userEvent.click(screen.getByText("회원가입"));

      // mock이 호출되었는지 확인
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123",
        nickname: "테스트",
        phone_number: "01012345678",
      });

      // 컴포넌트 리렌더링
      rerender(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      // 에러 메시지 확인
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  describe("네비게이션", () => {
    it("로그인 링크 클릭 시 로그인 페이지로 이동", async () => {
      renderSignUp();
      const loginLink = screen.getByText("로그인");

      await userEvent.click(loginLink);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
