import { LoginValidator } from "../../libs/validation/LoginValidation";

describe("LoginValidator", () => {
  let validator: LoginValidator;
  beforeEach(() => {
    validator = new LoginValidator();
  });
  describe("validateEmail", () => {
    it("올바른 에메일 형식 검증", () => {
      expect(validator.validateEmail("test@example.com")).toBe("");
    });
    it("빈 이메일 검증", () => {
      expect(validator.validateEmail("")).toBe("이메일을 입력해주세요");
    });
  });
  describe("validatePassword", () => {
    it("올바른 비밀번호 형식을 검증", () => {
      expect(validator.validatePassword("Password123")).toBe("");
      expect(validator.validatePassword("Pass123!@")).toBe("");
    });
    it("빈 비밀번호 검증", () => {
      expect(validator.validatePassword("")).toBe("비밀번호를 입력해주세요");
    });
  });
  describe("validateForm", () => {
    it("모든 필드가 유효할 때 검증", () => {
      const formData = {
        email: "test@example.com",
        password: "Password123",
      };
      const result = validator.valdiateForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({
        email: "",
        password: "",
      });
    });
    it("모든 필드가 비어있을 때 검증", () => {
      const formData = {
        email: "",
        password: "",
      };
      const result = validator.valdiateForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        email: "이메일을 입력해주세요",
        password: "비밀번호를 입력해주세요",
      });
    });
  });
});
