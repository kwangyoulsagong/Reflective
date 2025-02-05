interface FormData {
  email: string;
  password: string;
}
interface ValidationErrors {
  email: string;
  password: string;
}
interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
export class LoginValidator {
  validateEmail(email: string): string {
    if (!email) {
      return "이메일을 입력해주세요";
    }
    return "";
  }
  validatePassword(password: string): string {
    if (!password) {
      return "비밀번호를 입력해주세요";
    }
    return "";
  }
  valdiateForm(formData: FormData): ValidationResult {
    const errors = {
      email: this.validateEmail(formData.email),
      password: this.validatePassword(formData.password),
    };
    return {
      isValid: !Object.values(errors).some((error) => error !== ""),
      errors,
    };
  }
}
