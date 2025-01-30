import { IMAGE_URL_PATTERN } from "../../../constants/blockEditor";

export class ImageValidation {
  constructor(private readonly IMG_URL_PATTERN = IMAGE_URL_PATTERN) {}

  validate(item: string): boolean {
    return this.IMG_URL_PATTERN.test(item.trim());
  }
}
