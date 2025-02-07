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

  describe("numbered타입", () => {
    const strategy = new ListNumberingStrategy("numbered");

    it("같은 레벨의 아이템은 순차적으로 번호가 매겨져야 함", () => {
      const items = [
        { id: "1", content: "Item 1", level: 0, isCollapsed: false },
        { id: "2", content: "Item 2", level: 0, isCollapsed: false },
      ];

      expect(strategy.getMarker(items, 0)).toBe("1.");
      expect(strategy.getMarker(items, 1)).toBe("2.");
    });

    it("다른 레벨의 아이템은 다른 스타일로 표시되어야 함", () => {
      const items = [
        { id: "1", content: "Item 1", level: 0, isCollapsed: false },
        { id: "2", content: "Item 2", level: 1, isCollapsed: false },
        { id: "3", content: "Item 3", level: 2, isCollapsed: false },
      ];

      expect(strategy.getMarker(items, 0)).toBe("1.");
      expect(strategy.getMarker(items, 1)).toBe("a.");
      expect(strategy.getMarker(items, 2)).toBe("1)");
    });
  });
});
