import type { Meta, StoryObj } from "@storybook/react";
import { PostCard } from "./Card";
import { PostCardProps, PostType } from "./types";
const meta = {
  title: "UI/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "게시물을 표시하기 위한 카드 컴포넌트입니다. hover 효과와 애니메이션을 포함합니다.",
      },
    },
  },
  argTypes: {
    post: {
      description: "게시물 데이터",
      control: "object",
    },
    index: {
      description: "그리드에서의 카드 위치 인덱스",
      control: "number",
    },
    handlePost: {
      description: "카드 클릭 시 실행되는 핸들러",
    },
  },
} satisfies Meta<PostCardProps>;

export default meta;
type Story = StoryObj<PostCardProps>;

const mockPost: PostType = {
  post_id: "1",
  user_id: "user1",
  title: "React와 TypeScript로 프로젝트 시작하기",
  contents: { blocks: [] }, // 빈 contents object
  category: "개발",
  thumbnail:
    "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FVG5Uv%2FbtsEZb2rZ1J%2FtqEJIylHZ4iafjAo0BW4rk%2Fimg.png",
  created_date: new Date().toISOString(),
  updated_date: new Date().toISOString(),
  nickname: "개발자123",
  like_count: 42,
};
const CardContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-md">{children}</div>
);

export const Default: Story = {
  render: () => (
    <CardContainer>
      <PostCard
        post={mockPost}
        index={0}
        handlePost={(id, nickname, title) =>
          console.log("Clicked:", { id, nickname, title })
        }
      />
    </CardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본적인 게시물 카드 표시입니다.",
      },
    },
  },
};

export const WithLongTitle: Story = {
  render: () => (
    <CardContainer>
      <PostCard
        post={{
          ...mockPost,
          title:
            "매우 긴 제목의 게시물입니다. 이 제목은 두 줄 이상으로 표시되어 말줄임표가 적용됩니다. 실제로는 더 길 수 있습니다.",
        }}
        index={0}
        handlePost={(id, nickname, title) =>
          console.log("Clicked:", { id, nickname, title })
        }
      />
    </CardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "긴 제목이 있는 경우의 표시 방식입니다.",
      },
    },
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
      {[0, 1, 2].map((index) => (
        <PostCard
          key={index}
          post={{
            ...mockPost,
            post_id: String(index + 1),
            title: `게시물 제목 ${index + 1}`,
            like_count: Math.floor(Math.random() * 100),
          }}
          index={index}
          handlePost={(id, nickname, title) =>
            console.log("Clicked:", { id, nickname, title })
          }
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "그리드 레이아웃에서의 카드 배치를 보여줍니다.",
      },
    },
  },
};
