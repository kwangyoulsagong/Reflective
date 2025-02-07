import { ListNumberingStrategy } from "@/features/Write/libs/vallidation/list/numbering";
import { EDITOR_CONFIG } from "@/shared/constants/blockEditor";

describe("ListNumberingStrategy", () => {
  describe("bullet 타입", () => {
    const strategy = new ListNumberingStrategy("bullet");

    it("bullet 타입은 항상 기본 마커를 반환해야 함", () => {
      const items = [
        { id: "1", content: "Item 1", level: 0, isCollapsed: false },
        { id: "2", content: "Item 2", level: 1, isCollapsed: false },
      ];
      expect(strategy.getMarker(items, 0)).toBe(
        EDITOR_CONFIG.DEFAULT_WRITE_LIST_MARKER
      );
      expect(strategy.getMarker(items, 1)).toBe(
        EDITOR_CONFIG.DEFAULT_WRITE_LIST_MARKER
      );
    });
  });
});
