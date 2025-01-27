import { useState } from "react";
import { Block } from "../../../types/BlockEditor/BlockEditor";
import { ChartData } from "../../../types/BlockEditor/Chart";
import { getRandomColor } from "../../../constants/blockEditor";

const useChartData = (block: Block) => {
  // 초기 상태를 block.content에서 파싱하도록 변경
  const [chartData, setChartData] = useState<ChartData>(() => {
    try {
      // 차트 블록 형식
      const content =
        block.content ||
        '{"labels":[],"datasets":[{"label":"","data":[],"borderColor":"rgb(255,0,0)"}]}';
      // 데이터를 사용하기위 역직렬화
      const parseData = JSON.parse(content);
      return {
        labels: parseData.labels || [],
        datasets: parseData.datasets || [
          {
            label: "",
            data: [],
            borderColor: getRandomColor(),
          },
        ],
      };
    } catch {
      return {
        labels: "",
        datasets: {
          label: "",
          data: [],
          borderColor: getRandomColor(),
        },
      };
    }
  });

  return { chartData, setChartData };
};
export default useChartData;
