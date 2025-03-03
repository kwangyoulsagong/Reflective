export class imageValidation {
  constructor(
    private readonly validTypes = ["image/jpeg", "image/png", "image/gif"],
    private readonly maxSize = 10 * 1024 * 1024
  ) {}

  validate(file: any) {
    if (!file) return false;
    if (!this.validTypes.includes(file.type)) {
      alert(
        "이미지 파일만 업로드 가능합니다. 이미지 파일만 업로드 가능합니다. (JPEG, PNG, GIF)"
      );
      return false;
    }
    if (file.size > this.maxSize) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return false;
    }
    return true;
  }
}
