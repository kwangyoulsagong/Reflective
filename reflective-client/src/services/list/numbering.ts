import { EDITOR_CONFIG } from "../../constants/blockEditor";
import { ListItem, ListType } from "../../types/BlockEditor/List";

export class ListNumberingStrategy {
  constructor(private readonly type: ListType) {}

  getMarker(items: ListItem[], currentIndex: number): string {
    if (this.type === "bullet") return EDITOR_CONFIG.DEFAULT_WRITE_LIST_MARKER;
    const currentItem = items[currentIndex];
    const number = this.calculateNumber(items, currentIndex);
    return this.formatNumber(number, currentItem.level);
  }

  private calculateNumber(items: ListItem[], currentIndex: number): number {
    const currentItem = items[currentIndex];
    return (
      items
        // 현재 아이템 이전의 모든 아이템들을 가져옴
        .slice(0, currentIndex)
        // 현재 아이템과 같은 레벨의 아이템만 필터링
        .filter((item) => item.level === currentItem.level).length + 1
    );
  }

  private formatNumber(num: number, level: number): string {
    const styles: Record<number, (n: number) => string> = {
      0: (n) => `${n}.`,
      1: (n) => `${String.fromCharCode(96 + n)}.`,
      2: (n) => `${n})`,
    };
    const formatter = styles[level % 3] || styles[0];
    return formatter(num);
  }
}
