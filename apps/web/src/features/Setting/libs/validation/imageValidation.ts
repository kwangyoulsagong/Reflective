export type ToastType = "success" | "error" | "warning" | "info";

export class imageValidation {
  constructor(
    private readonly validTypes = ["image/jpeg", "image/png", "image/gif"],
    private readonly maxSize = 10 * 1024 * 1024
  ) {}

  validate(
    file: File,
    showToast: (message: string, type?: ToastType, duration?: number) => void
  ) {
    if (!file) return false;
    if (!this.validTypes.includes(file.type)) {
      showToast(
        "이미지 파일만 업로드 가능합니다. 이미지 파일만 업로드 가능합니다. (JPEG, PNG, GIF)",
        "error"
      );

      return false;
    }
    if (file.size > this.maxSize) {
      showToast("파일 크기는 10MB 이하여야 합니다.", "error");

      return false;
    }
    return true;
  }
}
