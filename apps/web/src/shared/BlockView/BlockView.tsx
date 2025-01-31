import { useCallback } from "react";
import { Block, ListItem } from "../../types/BlockView/BlockView";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  const renderContent = (text: string) => {
    return text.split("\n").map((line, index) => {
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/__(.*?)__/g, "<u>$1</u>");

      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{
            __html: formattedLine,
          }}
        />
      );
    });
  };

  // 아이템 번호 계산
  const calculateNumber = useCallback(
    (items: ListItem[], currentIndex: number): string => {
      const currentItem = items[currentIndex];
      if (block.type !== "numbered-list") return "•";

      let number = 1;
      for (let i = 0; i < currentIndex; i++) {
        const item = items[i];
        // 같은 레벨의 이전 아이템들만 카운트
        if (item.level === currentItem.level) {
          number++;
        }
        // 상위 레벨로 돌아갔다가 다시 현재 레벨이 나타나면 번호를 리셋
        if (
          item.level < currentItem.level &&
          i + 1 < items.length &&
          items[i + 1].level === currentItem.level
        ) {
          number = 1;
        }
      }

      // 들여쓰기 레벨에 따라 다른 번호 스타일 적용
      const getNumberStyle = (level: number, num: number): string => {
        switch (level % 3) {
          case 0:
            return `${num}.`; // 1., 2., 3.
          case 1:
            return `${String.fromCharCode(96 + num)}.`; // a., b., c.
          case 2:
            return `${num})`; // 1), 2), 3)
          default:
            return `${num}.`;
        }
      };

      return getNumberStyle(currentItem.level, number);
    },
    [block.type]
  );

  const renderListItems = (items: ListItem[], isNumbered = false) => {
    return items.map((item, index) => (
      <div
        key={item.id || index}
        style={{ marginLeft: `${item.level * 20}px` }}
        className="flex items-start gap-2"
      >
        {isNumbered ? (
          <span className="mr-2">{calculateNumber(items, index)}</span>
        ) : (
          <span className="mt-1">•</span>
        )}
        <span>{item.content}</span>
      </div>
    ));
  };

  const parseContent = (content: string): ListItem[] => {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
      return []; // 파싱 실패 시 빈 배열 반환
    }
  };

  switch (block.type) {
    case "paragraph":
      return (
        <div className="mb-4">{renderContent(block.content as string)}</div>
      );
    case "heading1":
      return (
        <h1 className="text-3xl font-bold mb-4">
          {renderContent(block.content as string)}
        </h1>
      );
    case "heading2":
      return (
        <h2 className="text-2xl font-bold mb-4">
          {renderContent(block.content as string)}
        </h2>
      );
    case "heading3":
      return (
        <h3 className="text-xl font-bold mb-4">
          {renderContent(block.content as string)}
        </h3>
      );
    case "list":
      return (
        <div className="mb-4 pl-4">
          {renderListItems(parseContent(block.content as string))}
        </div>
      );
    case "numbered-list":
      return (
        <div className="mb-4 pl-4">
          {renderListItems(parseContent(block.content as string), true)}
        </div>
      );
    case "image":
      return (
        <img
          src={block.content as string}
          alt={`Image for block ${block.id}`}
          className="mb-4 max-w-full h-auto"
        />
      );
    case "code":
      return (
        <SyntaxHighlighter
          language={"javascript"}
          style={tomorrow}
          className="mb-4 p-4 rounded-md"
        >
          {block.content as string}
        </SyntaxHighlighter>
      );
    case "chart": {
      const chartData: ChartData<"line", (number | null)[], unknown> = (() => {
        let parsedContent;

        try {
          parsedContent = JSON.parse(block.content as string);
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
          parsedContent = { labels: [], datasets: [] };
        }

        return {
          labels: parsedContent.labels || [],
          datasets: parsedContent.datasets || [],
        };
      })();

      return <Line data={chartData} />;
    }
    default:
      return null;
  }
};
export default BlockView;
