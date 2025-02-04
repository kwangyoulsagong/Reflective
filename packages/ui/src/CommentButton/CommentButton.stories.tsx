import type { Meta, StoryObj } from "@storybook/react";
import { CommentButton, buttonProps } from "./CommentButton";

const meta = {
  title: "UI/CommentButton",
  component: CommentButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "댓글 관련 액션에 사용되는 버튼 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "버튼의 스타일 변형",
      control: "select",
      options: ["primary", "sm-primary", "secondary", "cancel", "action"],
      defaultValue: "primary",
    },
    children: {
      description: "버튼 내부 콘텐츠",
      control: "text",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
    },
    className: {
      description: "추가 스타일링을 위한 클래스",
    },
  },
} satisfies Meta<typeof CommentButton>;

export default meta;
type Story = StoryObj<typeof CommentButton>;

const ButtonContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-4 p-4">{children}</div>
);

export const Primary: Story = {
  render: () => (
    <ButtonContainer>
      <CommentButton variant="primary" onClick={() => console.log("clicked")}>
        댓글 작성하기
      </CommentButton>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 댓글 작성 버튼입니다.",
      },
    },
  },
};

export const SmallPrimary: Story = {
  render: () => (
    <ButtonContainer>
      <CommentButton
        variant="sm-primary"
        onClick={() => console.log("clicked")}
      >
        작성
      </CommentButton>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "작은 크기의 기본 버튼입니다.",
      },
    },
  },
};

export const Secondary: Story = {
  render: () => (
    <ButtonContainer>
      <CommentButton variant="secondary" onClick={() => console.log("clicked")}>
        답글 달기
      </CommentButton>
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

export const Cancel: Story = {
  render: () => (
    <ButtonContainer>
      <CommentButton variant="cancel" onClick={() => console.log("clicked")}>
        취소
      </CommentButton>
    </ButtonContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "취소 액션을 위한 버튼입니다.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <ButtonContainer>
      <CommentButton variant="primary" onClick={() => console.log("clicked")}>
        댓글 작성
      </CommentButton>
      <CommentButton
        variant="sm-primary"
        onClick={() => console.log("clicked")}
      >
        작성
      </CommentButton>
      <CommentButton variant="secondary" onClick={() => console.log("clicked")}>
        답글 달기
      </CommentButton>
      <CommentButton variant="cancel" onClick={() => console.log("clicked")}>
        취소
      </CommentButton>
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
