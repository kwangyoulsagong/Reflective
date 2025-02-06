interface FormData {
  email: string;
  password: string;
  nickname: string;
  phone_number: string;
}
interface ValidationErrors {
  email: string;
  password: string;
  nickname: string;
  phone_number: string;
}
interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
export class SignUpValidator {
  private readonly emailRegex: RegExp;
  private readonly phoneRegex: RegExp;
  private readonly passwordRegex: RegExp;

  constructor() {
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.phoneRegex = /^01[0-9]{8,9}$/;
    this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  }
  validateEmail(email: string): string {
    if (!email) {
      return "이메일을 입력해주세요";
    }
    if (!this.emailRegex.test(email)) {
      return "올바른 이메일 형식이 아닙니다";
    }
    return "";
  }
  validatePassword(password: string): string {
    if (!password) {
      return "비밀번호를 입력해주세요";
    }
    if (password.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다";
    }
    if (!this.passwordRegex.test(password)) {
      return "비밀번호는 영문자와 숫자를 포함해야 합니다";
    }
    return "";
  }
  validateNickname(nickname: string): string {
    if (!nickname) {
      return "닉네임을 입력해주세요";
    }
    if (nickname.length < 2) {
      return "닉네임은 2자 이상이어야 합니다";
    }
    if (nickname.length > 10) {
      return "닉네임은 10자 이하여야 합니다";
    }
    return "";
  }
  validatePhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) {
      return "전화번호를 입력해주세요";
    }
    if (!this.phoneRegex.test(phoneNumber)) {
      return "올바른 전화번호 형식이 아닙니다";
    }
    return "";
  }
  validateForm(formData: FormData): ValidationResult {
    const errors = {
      email: this.validateEmail(formData.email),
      password: this.validatePassword(formData.password),
      nickname: this.validateNickname(formData.nickname),
      phone_number: this.validatePhoneNumber(formData.phone_number),
    };

    return {
      isValid: !Object.values(errors).some((error) => error !== ""),
      errors,
    };
  }
}
