import { ListValidator } from "@/features/Write/libs/vallidation/list/validation";

describe("ListValidator", () => {
  const options = {
    maxLevel: 5,
    minItems: 1,
    maxItems: 5,
    allowCollapse: true,
  };

  const validator = new ListValidator(options);

  describe("validateItem", () => {
    it("유효한 아이템은 에러를 발생시키지 않아야 함", () => {
      const item = {
        id: "1",
        content: "Valid item",
        level: 1,
        isCollapsed: false,
      };
      expect(() => validator.validateItem(item)).not.toThrow();
    });

    it("최대 레벨을 초과하면 에러를 발생시켜야 함", () => {
      const item = {
        id: "1",
        content: "Invalid level",
        level: 6,
        isCollapsed: false,
      };
      expect(() => validator.validateItem(item)).toThrow(
        "유효하지 않는 들여쓰기 레벨: 6"
      );
    });

    it("음수 레벨은 에러를 발생시켜야 함", () => {
      const item = {
        id: "1",
        content: "Negative level",
        level: -1,
        isCollapsed: false,
      };
      expect(() => validator.validateItem(item)).toThrow(
        "유효하지 않는 들여쓰기 레벨: -1"
      );
    });
  });

  describe("validateItems", () => {
    it("유효한 아이템 목록은 에러를 발생시키지 않아야 함", () => {
      const items = [
        { id: "1", content: "Item 1", level: 0, isCollapsed: false },
        { id: "2", content: "Item 2", level: 1, isCollapsed: false },
      ];
      expect(() => validator.validateItems(items)).not.toThrow();
    });

    it("최대 아이템 수를 초과하려면 에러를 발생시켜야 함", () => {
      const items = [
        { id: "1", content: "Item 1", level: 0, isCollapsed: false },
        { id: "2", content: "Item 2", level: 1, isCollapsed: false },
        { id: "3", content: "Item 3", level: 2, isCollapsed: false },
        { id: "4", content: "Item 4", level: 3, isCollapsed: false },
        { id: "5", content: "Item 5", level: 4, isCollapsed: false },
        { id: "6", content: "Item 6", level: 5, isCollapsed: false },
      ];
      expect(() => validator.validateItems(items)).toThrow(
        "아이템이 너무 많습니다: 6"
      );
    });

    it("에러는 ListError 탑이이어야 함", () => {
      const items = [
        { id: "1", content: "Invalid level", level: 3, isCollapsed: false },
      ];

      try {
        validator.validateItems(items);
      } catch (error) {
        expect(error).toMatchObject({
          name: "ListError",
          code: "VALIDATION_ERROR",
          context: { options },
        });
      }
    });
  });
});
