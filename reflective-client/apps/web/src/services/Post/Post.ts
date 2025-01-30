import { Block } from "../../types/BlockView/BlockView";
import { getPostType } from "../../types/types";

export class PostValidation {
  constructor(private isValid = false) {}
  isValidation(data: Partial<getPostType>) {
    if (!data) {
      return {
        isValid: this.isValid,
        isError: "데이터가 존재 하지 않습니다.",
      };
    }
    if (!Array.isArray(data.contents)) {
      return {
        isValid: this.isValid,
        isError: `데이터 컨텐츠는 타입이 배열이여야 합니다, 현재는: ${typeof data?.contents}`,
      };
    }
    return {
      isValid: true,
      contents: data.contents as Block[],
    };
  }
}
