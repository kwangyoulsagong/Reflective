import type { Meta, StoryObj } from "@storybook/react";
import { SearchList } from "./SearchList";
import { action } from "@storybook/addon-actions";

import { Post } from "./types/type";

const mockResults: Post[] = [
  {
    post_id: "1",
    title: "리액트 훅(React Hooks)의 기본 개념",
    contents:
      "리액트 훅은 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 기능입니다.",
    created_date: "2023-06-15",
    nickname: "김개발",
    category: "React",
    like_count: 42,
  },
  {
    post_id: "2",
    title: "TypeScript와 함께하는 React 개발",
    contents:
      "TypeScript를 React 프로젝트에 통합하여 타입 안정성을 높이는 방법에 대해 알아봅니다.",
    created_date: "2023-07-22",
    nickname: "이코딩",
    category: "TypeScript",
    like_count: 38,
  },
  {
    post_id: "3",
    title: "Next.js로 SSR 구현하기",
    contents:
      "서버 사이드 렌더링을 지원하는 Next.js의 기본 사용법과 장점에 대해 설명합니다.",
    created_date: "2023-08-10",
    nickname: "박웹개발",
    category: "Next.js",
    like_count: 56,
  },
];

const meta = {
  title: "Components/SearchList",
  component: SearchList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "검색 결과를 표시하는 리스트 컴포넌트입니다. 검색 결과, 로딩 상태, 에러 상태, 페이지네이션 등을 지원합니다.",
      },
    },
  },
  argTypes: {
    results: {
      description: "검색 결과 배열",
      control: "object",
    },
    totalPages: {
      description: "전체 페이지 수",
      control: { type: "number", min: 0 },
    },
    currentPage: {
      description: "현재 페이지 번호",
      control: { type: "number", min: 1 },
    },
    onPageChange: {
      description: "페이지 변경 이벤트 핸들러",
    },
    isLoading: {
      description: "로딩 상태 여부",
      control: "boolean",
    },
    isError: {
      description: "에러 상태 여부",
      control: "boolean",
    },
    query: {
      description: "검색어",
      control: "text",
    },
    goToPostDetail: {
      description: "게시글 상세 페이지로 이동하는 함수",
    },
  },
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof SearchList>;

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 bg-gray-100 min-h-screen">
    <div className="max-w-3xl mx-auto">{children}</div>
  </div>
);

export const Default: Story = {
  render: () => (
    <Container>
      <SearchList
        results={mockResults}
        totalPages={5}
        currentPage={1}
        onPageChange={action("Page changed")}
        query="리액트"
        goToPostDetail={action("Navigate to post detail")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "검색 결과가 있는 기본 상태의 SearchList 컴포넌트입니다.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <Container>
      <SearchList
        results={[]}
        totalPages={0}
        currentPage={1}
        onPageChange={action("Page changed")}
        isLoading={true}
        query="리액트"
        goToPostDetail={action("Navigate to post detail")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "데이터를 불러오는 중인 로딩 상태의 SearchList 컴포넌트입니다.",
      },
    },
  },
};

export const Error: Story = {
  render: () => (
    <Container>
      <SearchList
        results={[]}
        totalPages={0}
        currentPage={1}
        onPageChange={action("Page changed")}
        isError={true}
        query="리액트"
        goToPostDetail={action("Navigate to post detail")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "에러가 발생한 상태의 SearchList 컴포넌트입니다.",
      },
    },
  },
};

export const NoResults: Story = {
  render: () => (
    <Container>
      <SearchList
        results={[]}
        totalPages={0}
        currentPage={1}
        onPageChange={action("Page changed")}
        query="찾을 수 없는 검색어"
        goToPostDetail={action("Navigate to post detail")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "검색 결과가 없는 상태의 SearchList 컴포넌트입니다.",
      },
    },
  },
};

export const NoQuery: Story = {
  render: () => (
    <Container>
      <SearchList
        results={[]}
        totalPages={0}
        currentPage={1}
        onPageChange={action("Page changed")}
        query=""
        goToPostDetail={action("Navigate to post detail")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "검색어가 입력되지 않은 상태의 SearchList 컴포넌트입니다.",
      },
    },
  },
};

export const MultiplePages: Story = {
  render: () => (
    <Container>
      <SearchList
        results={mockResults}
        totalPages={10}
        currentPage={5}
        onPageChange={action("Page changed")}
        query="리액트"
        goToPostDetail={action("Navigate to post detail")}
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: "여러 페이지가 있는 상태의 SearchList 컴포넌트입니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          기본 상태 (검색 결과 있음)
        </h3>
        <SearchList
          results={mockResults}
          totalPages={5}
          currentPage={1}
          onPageChange={action("Page changed")}
          query="리액트"
          goToPostDetail={action("Navigate to post detail")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">로딩 상태</h3>
        <SearchList
          results={[]}
          totalPages={0}
          currentPage={1}
          onPageChange={action("Page changed")}
          isLoading={true}
          query="리액트"
          goToPostDetail={action("Navigate to post detail")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">에러 상태</h3>
        <SearchList
          results={[]}
          totalPages={0}
          currentPage={1}
          onPageChange={action("Page changed")}
          isError={true}
          query="리액트"
          goToPostDetail={action("Navigate to post detail")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">검색 결과 없음</h3>
        <SearchList
          results={[]}
          totalPages={0}
          currentPage={1}
          onPageChange={action("Page changed")}
          query="찾을 수 없는 검색어"
          goToPostDetail={action("Navigate to post detail")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">검색어 없음</h3>
        <SearchList
          results={[]}
          totalPages={0}
          currentPage={1}
          onPageChange={action("Page changed")}
          query=""
          goToPostDetail={action("Navigate to post detail")}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "SearchList 컴포넌트의 모든 상태를 한번에 보여줍니다.",
      },
    },
  },
};
