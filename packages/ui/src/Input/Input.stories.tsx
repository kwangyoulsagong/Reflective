import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputProps } from "./Input";
import { useState } from "react";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "기본 입력 컴포넌트입니다. 다양한 타입의 입력을 지원하며, 커스텀 스타일링이 가능합니다.",
      },
    },
  },
  argTypes: {
    value: {
      description: "입력 필드의 값",
      type: { name: "string", required: true },
    },
    onChange: {
      description: "값 변경 시 호출되는 핸들러",
      type: { name: "function", required: true },
    },
    placeholder: {
      description: "입력 필드의 플레이스홀더",
      type: { name: "string", required: true },
    },
    type: {
      description: "입력 필드의 타입",
      control: "select",
      options: ["text", "email", "password", "tel"],
      table: {
        defaultValue: { summary: "text" },
      },
    },
    className: {
      description: "추가 스타일링을 위한 클래스",
      type: "string",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// Input을 감싸는 컨테이너 컴포넌트
const InputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 p-4">{children}</div>
);

// 기본 상태 관리 로직을 가진 컴포넌트
const InputWithState = ({
  type = "text",
  placeholder,
}: {
  type?: string;
  placeholder: string;
}) => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
};

export const Default: Story = {
  render: () => (
    <InputContainer>
      <InputWithState placeholder="텍스트를 입력하세요" />
    </InputContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본적인 텍스트 입력 필드입니다.",
      },
    },
  },
};

export const Email: Story = {
  render: () => (
    <InputContainer>
      <InputWithState type="email" placeholder="이메일을 입력하세요" />
    </InputContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "이메일 형식을 검증하는 입력 필드입니다.",
      },
    },
  },
};

export const Password: Story = {
  render: () => (
    <InputContainer>
      <InputWithState type="password" placeholder="비밀번호를 입력하세요" />
    </InputContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "비밀번호 입력을 위한 필드입니다. 입력값이 마스킹됩니다.",
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <InputContainer>
      <InputWithState placeholder="기본 텍스트" />
      <InputWithState type="email" placeholder="이메일 입력" />
      <InputWithState type="password" placeholder="비밀번호 입력" />
      <InputWithState type="tel" placeholder="전화번호 입력" />
    </InputContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "지원하는 모든 입력 타입을 한 번에 보여주는 예시입니다.",
      },
    },
  },
};
