import { ListError, ListItem, ListOptions } from "../../types/BlockEditor/List";

export class ListValidator {
  constructor(private readonly options: Required<ListOptions>) {}
  validateItem(item: ListItem): void {
    if (item.level < 0 || item.level > this.options.maxLevel) {
      throw this.createError(
        "VALIDATION_ERROR",
        `유효하지 않는 들여쓰기 레벨: ${item.level}`
      );
    }
  }
  validateItems(items: ListItem[]): void {
    if (items.length > this.options.maxItems) {
      throw this.createError(
        "VALIDATION_ERROR",
        `아이템이 너무 많습니다: ${items.length}`
      );
    }
    items.forEach(this.validateItem.bind(this));
  }

  private createError(code: ListError["code"], message: string): ListError {
    return {
      name: "ListError",
      code,
      message,
      context: { options: this.options },
    } as ListError;
  }
}
