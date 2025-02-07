import { fireEvent, render } from "@testing-library/react";
import { VirtualizedList } from "../../ui/BlockEditor/ListEditor/VirtualizedList";

describe("VirtualizedList", () => {
  const mockOnScroll = jest.fn();
  const mockRenderItem = jest.fn((index) => <div>{index}</div>);

  const defaultProps = {
    items: Array(200)
      .fill(null)
      .map((_, i) => ({
        id: `item-${i}`,
        content: `Item ${i}`,
        level: 0,
        isCollapsed: false,
      })),
    virtualItems: [
      { index: 0, offsetTop: 0 },
      { index: 1, offsetTop: 40 },
      { index: 2, offsetTop: 80 },
    ],
    totalSize: 4000,
    itemHeight: 40,
    renderItem: mockRenderItem,
    onScroll: mockOnScroll,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("가상 아이템들이 올바른 위치에 렌더링되어야 함", () => {
    const { container } = render(<VirtualizedList {...defaultProps} />);
    const items = container.querySelectorAll('[role="listitem"]');

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveStyle({ transform: "translateY(0px)" });
    expect(items[1]).toHaveStyle({ transform: "translateY(40px)" });
    expect(items[2]).toHaveStyle({ transform: "translateY(80px)" });
  });

  it("스크롤 시 onScroll이 호출되어야 함", async () => {
    const { container } = render(<VirtualizedList {...defaultProps} />);
    const list = container.firstChild as HTMLElement;
    fireEvent.scroll(list, { target: { scrollTop: 100 } });

    expect(mockOnScroll).toHaveBeenCalledWith(100);
  });

  it("totalSize에 따라 올바른 높이가 설정되어야 함", () => {
    const { container } = render(<VirtualizedList {...defaultProps} />);

    const virtualContainer = container.querySelector('[style*="height"]');
    expect(virtualContainer).toHaveStyle({ height: "100%" });
  });
});
