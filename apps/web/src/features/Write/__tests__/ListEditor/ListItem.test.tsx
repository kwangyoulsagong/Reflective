import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ListItem } from "../../ui/BlockEditor/ListEditor/ListItem";
import userEvent from "@testing-library/user-event";

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

  it("입력값 변경 시 onChange가 호출되어야 함", async () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByDisplayValue("Test content") as HTMLInputElement;

    await userEvent.clear(input);

    fireEvent.change(input, { target: { value: "Test contentnew" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("test-item", "Test contentnew");
    });
  });

  it("키 입력시 onKeyDown이 호출되어야 함", async () => {
    render(<ListItem {...defaultProps} />);

    const input = screen.getByDisplayValue("Test content");
    input.focus();
    await userEvent.keyboard("{enter}");
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it("placeholder 텍스트가 올바르게 표시되어야 함", () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByPlaceholderText("리스트 아이템...");
    expect(input).toBeInTheDocument();
  });

  it("입력 필드가 적절한 ARIA 레이블을 가져야 함", () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByLabelText("List item level 1");
    expect(input).toBeInTheDocument();
  });

  it("입력 필드의 스타일이 올바르게 적용되어야 함", () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByDisplayValue("Test content");
    expect(input).toHaveClass(
      "flex-1",
      "px-2",
      "py-1",
      "bg-transparent",
      "outline-none",
      "border-none"
    );
  });

  it("번호가 올바른 스타일로 렌더링되어야 함", () => {
    render(<ListItem {...defaultProps} />);
    const number = screen.getByText("1.");
    expect(number).toHaveClass(
      "mr-2",
      "text-gray-500",
      "min-w-[24px]",
      "select-none"
    );
  });

  it("ChevronDown 아이콘이 올바른 스타일로 렌더링되어야 함", () => {
    const { container } = render(<ListItem {...defaultProps} />);
    const chevronIcon = container.querySelector(".w-4.h-4.text-gray-400");
    expect(chevronIcon).toBeInTheDocument();
  });

  it("inputRef가 전달되면 올바르게 적용되어야 함", () => {
    const ref = jest.fn();
    render(<ListItem {...defaultProps} inputRef={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("빈 content로 렌더링되어도 정상적으로 동작해야 함", () => {
    const emptyProps = {
      ...defaultProps,
      item: { ...defaultProps.item, content: "" },
    };
    render(<ListItem {...emptyProps} />);
    const input = screen.getByPlaceholderText("리스트 아이템...");
    expect(input).toHaveValue("");
  });

  it("여러 번의 입력 변경을 올바르게 처리해야 함", async () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByDisplayValue("Test content");

    await userEvent.clear(input);

    fireEvent.change(input, { target: { value: "First change" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("test-item", "First change");
    });
    await userEvent.clear(input);

    fireEvent.change(input, { target: { value: "Second change" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("test-item", "Second change");
    });
  });

  it("다양한 키보드 이벤트를 올바르게 처리해야 함", async () => {
    render(<ListItem {...defaultProps} />);
    const input = screen.getByDisplayValue("Test content");

    await userEvent.type(input, "{enter}");
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object), "test-item");

    await userEvent.type(input, "{tab}");
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object), "test-item");

    await userEvent.type(input, "{backspace}");
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object), "test-item");
  });
});
