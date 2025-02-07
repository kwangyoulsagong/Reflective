import { ListValidator } from "@/features/Write/libs/vallidation/list/validation";

describe("ListValidator", () => {
  const options = {
    maxLevel: 5,
    minItems: 1,
    maxItems: 1000,
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
  });
});
