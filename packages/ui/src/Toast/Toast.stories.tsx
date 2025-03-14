import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { action } from "@storybook/addon-actions";
import { useState } from "react";

// Toast 컴포넌트의 메타데이터 정의
const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자에게 알림을 제공하는 토스트 컴포넌트입니다. 성공, 오류, 경고, 정보 등 다양한 타입을 지원합니다.",
      },
    },
  },
  argTypes: {
    id: {
      description: "토스트 식별자",
      control: "text",
    },
    message: {
      description: "토스트에 표시될 메시지",
      control: "text",
    },
    type: {
      description: "토스트 타입 (success, error, warning, info)",
      control: {
        type: "select",
        options: ["success", "error", "warning", "info"],
      },
    },
    duration: {
      description: "토스트가 표시되는 시간 (밀리초)",
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    onClose: {
      description: "토스트가 닫힐 때 호출되는 콜백 함수",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

// 컨테이너 스타일
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 bg-gray-100 flex justify-center items-start min-h-screen">
    <div>{children}</div>
  </div>
);

// 기본 토스트
export const Default: Story = {
  render: () => (
    <Container>
      <Toast
        id="1"
        message="기본 정보 메시지입니다."
        onClose={action("Toast closed")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 정보(info) 타입의 토스트 메시지입니다.",
      },
    },
  },
};

// 성공 토스트
export const Success: Story = {
  args: {
    message: "ㄹㅇㅁㄹㄴㄹㄴㅁㄴㄹㅁ\n",
  },

  render: () => (
    <Container>
      <Toast
        id="2"
        message="작업이 성공적으로 완료되었습니다."
        type="success"
        onClose={action("Toast closed")}
      />
    </Container>
  ),

  parameters: {
    docs: {
      description: {
        story: "성공(success) 타입의 토스트 메시지입니다.",
      },
    },
  },
};

// 오류 토스트
export const Error: Story = {
  render: () => (
    <Container>
      <Toast
        id="3"
        message="오류가 발생했습니다. 다시 시도해주세요."
        type="error"
        onClose={action("Toast closed")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "오류(error) 타입의 토스트 메시지입니다.",
      },
    },
  },
};

// 경고 토스트
export const Warning: Story = {
  render: () => (
    <Container>
      <Toast
        id="4"
        message="주의: 저장되지 않은 변경사항이 있습니다."
        type="warning"
        onClose={action("Toast closed")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "경고(warning) 타입의 토스트 메시지입니다.",
      },
    },
  },
};

// 긴 메시지 토스트
export const LongMessage: Story = {
  render: () => (
    <Container>
      <Toast
        id="5"
        message="이것은 매우 긴 메시지입니다. 토스트 컴포넌트가 긴 텍스트를 어떻게 처리하는지 확인하기 위한 것입니다. 레이아웃이 깨지지 않고 적절하게 표시되어야 합니다."
        onClose={action("Toast closed")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "긴 메시지를 포함한 토스트입니다. 레이아웃 처리를 테스트합니다.",
      },
    },
  },
};

// 다양한 지속 시간
export const CustomDuration: Story = {
  render: () => (
    <Container>
      <Toast
        id="6"
        message="이 토스트는 7초 동안 표시됩니다."
        duration={7000}
        onClose={action("Toast closed")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "사용자 정의 지속 시간 (7초)을 가진 토스트입니다.",
      },
    },
  },
};

// 인터랙티브 토스트 데모
export const InteractiveDemo: Story = {
  render: () => {
    // 토스트 타입 정의
    type ToastType = "info" | "success" | "warning" | "error";

    interface ToastItem {
      id: string;
      type: ToastType;
      message: string;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (type: ToastType) => {
      const id = Date.now().toString();
      const messages: Record<ToastType, string> = {
        info: "새로운 정보가 있습니다.",
        success: "작업이 성공적으로 완료되었습니다.",
        warning: "주의가 필요한 작업입니다.",
        error: "오류가 발생했습니다.",
      };

      const newToast: ToastItem = {
        id,
        type,
        message: messages[type],
      };

      setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => addToast("info")}
          >
            Info
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addToast("success")}
          >
            Success
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => addToast("warning")}
          >
            Warning
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => addToast("error")}
          >
            Error
          </button>
        </div>

        <div className="space-y-2">
          {toasts.map((toast) => (
            <div key={toast.id} className="relative" style={{ height: "80px" }}>
              <Toast
                id={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={removeToast}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "인터랙티브한 토스트 데모입니다. 버튼을 클릭하여 다양한 유형의 토스트를 생성할 수 있습니다.",
      },
    },
  },
};

// 모든 토스트 타입 한번에 보기
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Info Toast</h3>
        <Toast
          id="info"
          message="정보 메시지입니다."
          type="info"
          onClose={action("Info toast closed")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Success Toast</h3>
        <Toast
          id="success"
          message="성공 메시지입니다."
          type="success"
          onClose={action("Success toast closed")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Warning Toast</h3>
        <Toast
          id="warning"
          message="경고 메시지입니다."
          type="warning"
          onClose={action("Warning toast closed")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Error Toast</h3>
        <Toast
          id="error"
          message="오류 메시지입니다."
          type="error"
          onClose={action("Error toast closed")}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 토스트 타입을 한번에 볼 수 있는 예시입니다.",
      },
    },
  },
};
