import { render, screen } from "@testing-library/react";
import { ListItem } from "../../ui/BlockEditor/ListEditor/ListItem";

describe("ListItem", () => {
  const mockOnChange = jest.fn();
  const mockOnKeyDown = jest.fn();

  const defaultProps = {
    item: {
      id: "test-item",
      content: "Test content",
      level: 0,
      isCollapsed: false,
    },
    number: "1.",
    onChange: mockOnChange,
    onKeyDown: mockOnKeyDown,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("아이템 정보가 올바르게 렌더링되어야 함", () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByDisplayValue("Test content");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("1.")).toBeInTheDocument();
  });

  it("들여쓰기 레벨에 따라 올바른 마진이 적용되어야 함", () => {
    const props = {
      ...defaultProps,
      item: { ...defaultProps.item, level: 2 },
    };
    const { container } = render(<ListItem {...props} />);
    const itemDiv = container.firstChild as HTMLElement;
    expect(itemDiv).toHaveStyle({ marginLeft: "48px" });
  });
});
