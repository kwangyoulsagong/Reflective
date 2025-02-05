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
