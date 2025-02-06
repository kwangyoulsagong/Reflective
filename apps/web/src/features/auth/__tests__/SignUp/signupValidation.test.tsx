import { SignUpValidator } from "../../libs/validation/SignUpValidation";

describe("SignUpValidator", () => {
  let validator: SignUpValidator;
  beforeEach(() => {
    validator = new SignUpValidator();
  });
  describe("validateEmail", () => {
    it("올바른 이메일 형식 검증", () => {
      expect(validator.validateEmail("test@example.com")).toBe("");
    });
    it("빈 이메일 검증", () => {
      expect(validator.validateEmail("")).toBe("이메일을 입력해주세요");
    });
    it("잘못된 이메일 형식 검증", () => {
      expect(validator.validateEmail("invalid-email")).toBe(
        "올바른 이메일 형식이 아닙니다"
      );
      expect(validator.validateEmail("test@")).toBe(
        "올바른 이메일 형식이 아닙니다"
      );
      expect(validator.validateEmail("@example.com")).toBe(
        "올바른 이메일 형식이 아닙니다"
      );
    });
    describe("validatePassword", () => {
      it("올바른 비밀번호 형식을 검증", () => {
        expect(validator.validatePassword("Password123")).toBe("");
        expect(validator.validatePassword("Pass123!@")).toBe("");
      });
      it("빈 비밀번호 검증", () => {
        expect(validator.validatePassword("")).toBe("비밀번호를 입력해주세요");
      });
      it("짧은 비밀번호 검증", () => {
        expect(validator.validatePassword("Pass1")).toBe(
          "비밀번호는 8자 이상이어야 합니다"
        );
      });
      it("영문자와 숫자가 없는 비밀번호 검증", () => {
        expect(validator.validatePassword("password")).toBe(
          "비밀번호는 영문자와 숫자를 포함해야 합니다"
        );
        expect(validator.validatePassword("12345678")).toBe(
          "비밀번호는 영문자와 숫자를 포함해야 합니다"
        );
      });
    });
  });
  describe("validateNickname", () => {
    it("올바른 닉네임 형식을 검증", () => {
      expect(validator.validateNickname("닉네임")).toBe("");
      expect(validator.validateNickname("user123")).toBe("");
    });

    it("빈 닉네임 검증", () => {
      expect(validator.validateNickname("")).toBe("닉네임을 입력해주세요");
    });

    it("짧은 닉네임 검증", () => {
      expect(validator.validateNickname("한")).toBe(
        "닉네임은 2자 이상이어야 합니다"
      );
    });

    it("긴 닉네임 검증", () => {
      expect(validator.validateNickname("매우긴닉네임을써보겠습니다")).toBe(
        "닉네임은 10자 이하여야 합니다"
      );
    });
  });

  describe("validatePhoneNumber", () => {
    it("올바른 전화번호 형식을 검증", () => {
      expect(validator.validatePhoneNumber("01012345678")).toBe("");
      expect(validator.validatePhoneNumber("0101234567")).toBe("");
    });

    it("빈 전화번호 검증", () => {
      expect(validator.validatePhoneNumber("")).toBe("전화번호를 입력해주세요");
    });

    it("잘못된 전화번호 형식 검증", () => {
      expect(validator.validatePhoneNumber("02123456")).toBe(
        "올바른 전화번호 형식이 아닙니다"
      );
      expect(validator.validatePhoneNumber("0101234")).toBe(
        "올바른 전화번호 형식이 아닙니다"
      );
    });
  });
  describe("validateForm", () => {
    it("모든 필드가 유효할 때 검증", () => {
      const formData = {
        email: "test@example.com",
        password: "Password123",
        nickname: "닉네임",
        phone_number: "01012345678",
      };

      const result = validator.validateForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({
        email: "",
        password: "",
        nickname: "",
        phone_number: "",
      });
    });

    it("모든 필드가 비어있을 때 검증", () => {
      const formData = {
        email: "",
        password: "",
        nickname: "",
        phone_number: "",
      };

      const result = validator.validateForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        email: "이메일을 입력해주세요",
        password: "비밀번호를 입력해주세요",
        nickname: "닉네임을 입력해주세요",
        phone_number: "전화번호를 입력해주세요",
      });
    });
  });
});
