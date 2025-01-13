import { MutableRefObject } from "react";
import { ListItem } from "../../../types/BlockEditor/List";

export class FocusManager {
  constructor(
    private readonly refs: MutableRefObject<Record<string, HTMLInputElement>>
  ) {}
  //   id로 특정 리스트 아이템의 input을 찾아 포커스
  focus(id: string): void {
    if (!id) return;
    // 다음 렌더링 시점에 포커스 처리
    window.requestAnimationFrame(() => {
      const element = this.refs.current[id];
      if (element instanceof HTMLInputElement) {
        element.focus();
        // 커서를 input의 텍스트 끝으로 이동
        element.selectionStart = element.value.length;
      }
    });
  }
  //   현재 아이템의 이전 아이템으로 포커스 이동
  focusPrevious(currentId: string, items: ListItem[]): void {
    // 현재 아이템 index
    const index = items.findIndex((item) => item.id === currentId);

    if (index > 0) {
      // 이전 아이템 포커스
      this.focus(items[index - 1].id);
    }
  }
}
