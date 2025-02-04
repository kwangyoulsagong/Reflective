import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./Button";
import { Pencil, Trash2 } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 스타일과 용도로 사용할 수 있는 버튼 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "버튼의 스타일 변형",
      control: "select",
      options: [
        "primary",
        "secondary",
        "auth",
        "favorite",
        "edit",
        "delete",
        "like",
      ],
    },
    children: {
      description: "버튼 내부 콘텐츠",
      control: "text",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
    },
    icon: {
      description: "버튼에 표시될 아이콘",
    },
    className: {
      description: "추가 스타일링을 위한 클래스",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// 버튼들을 그룹으로 보여주는 컨테이너
const ButtonContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-4 p-4">{children}</div>
);

export const Primary: Story = {
  render: () => (
    <ButtonContainer>
      <Button variant="primary" onClick={() => console.log("clicked")}>
        댓글 작성하기
      </Button>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "주요 액션을 위한 기본 버튼입니다.",
      },
    },
  },
};

export const Secondary: Story = {
  render: () => (
    <ButtonContainer>
      <Button variant="secondary" onClick={() => console.log("clicked")}>
        버튼
      </Button>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "보조 액션을 위한 버튼입니다.",
      },
    },
  },
};

export const Auth: Story = {
  render: () => (
    <ButtonContainer>
      <Button variant="auth" onClick={() => console.log("clicked")}>
        로그인
      </Button>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "인증 관련 액션을 위한 넓은 버튼입니다.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <ButtonContainer>
      <Button
        variant="edit"
        onClick={() => console.log("clicked")}
        icon={<Pencil className="w-4 h-4" />}
      >
        수정
      </Button>
      <Button
        variant="delete"
        onClick={() => console.log("clicked")}
        icon={<Trash2 className="w-4 h-4" />}
      >
        삭제
      </Button>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "아이콘이 포함된 버튼 예시입니다.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <ButtonContainer>
      <Button variant="primary" onClick={() => console.log("clicked")}>
        Primary
      </Button>
      <Button variant="secondary" onClick={() => console.log("clicked")}>
        Secondary
      </Button>
      <Button variant="auth" onClick={() => console.log("clicked")}>
        로그인
      </Button>
      <Button variant="favorite" onClick={() => console.log("clicked")}>
        즐겨찾기
      </Button>
      <Button variant="favorite" onClick={() => console.log("clicked")}>
        취소하기
      </Button>
      <Button
        variant="edit"
        onClick={() => console.log("clicked")}
        icon={<Pencil className="w-4 h-4" />}
      >
        수정
      </Button>
      <Button
        variant="delete"
        onClick={() => console.log("clicked")}
        icon={<Trash2 className="w-4 h-4" />}
      >
        삭제
      </Button>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "사용 가능한 모든 버튼 변형을 보여줍니다.",
      },
    },
  },
};
