import { FocusManager } from "@/features/Write/libs/vallidation/list/focus";

describe("FocusManager", () => {
  let focusManager: FocusManager;
  let refs: { current: Record<string, HTMLInputElement> };

  beforeEach(() => {
    // HTMLInputElement mock 생성
    const mockInput = Object.assign(document.createElement("input"), {
      focus: jest.fn(),
      value: "test value",
      selectionStart: 0,
    });

    refs = {
      current: {
        "item-1": mockInput,
        "item-2": mockInput,
        "item-3": mockInput,
      },
    };

    focusManager = new FocusManager(refs);

    // requestAnimationFrame 목
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("focus", () => {
    it("유효한 id로 focus 호출 시 해당 요소에 포커스되어야 함", () => {
      focusManager.focus("item-1");
      expect(refs.current["item-1"].focus).toHaveBeenCalled();
    });

    it("빈 id로 focus 호출 시 아무 동작도 하지 않아야 함", () => {
      focusManager.focus("");
      expect(refs.current["item-1"].focus).not.toHaveBeenCalled();
    });

    it("focus 시 커거사 텍스트 끝으로 이동해야 함", () => {
      focusManager.focus("item-1");
      expect(refs.current["item-1"].selectionStart).toBe(
        refs.current["item-1"].value.length
      );
    });
  });
  describe("focusPrevious", () => {
    const items = [
      { id: "item-1", content: "Item 1", level: 0, isCollapsed: false },
      { id: "item-2", content: "Item 2", level: 0, isCollapsed: false },
      { id: "item-3", content: "Item 3", level: 0, isCollapsed: false },
    ];
    it("이전 아이템으로 포커스가 이동해야 함", () => {
      focusManager.focusPrevious("item-2", items);
      expect(refs.current["item-1"].focus).toHaveBeenCalled();
    });

    it("첫 번째 아이템에서는 이전 포커스 이동이 발생하지 않아야 함", () => {
      focusManager.focusPrevious("item-1", items);
      expect(refs.current["item-1"].focus).not.toHaveBeenCalled();
    });
  });
});
