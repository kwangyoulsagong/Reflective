import { useCallback, useState } from "react";
import { ChartData } from "../../../types/BlockEditor/Chart";
import { Block } from "../../../types/BlockEditor/BlockEditor";
import { getRandomColor } from "../../../constants/blockEditor";

const useGridChart = (
  chartData: ChartData,
  block: Block,
  updateBlockContent: (id: string, content: string) => void,
  debouncedUpdateRef: React.MutableRefObject<any>,
  updateBlock: (id: string, content: string, type: string) => void,
  setChartData: never
) => {
  const [error, setError] = useState<string | null>(null);
  const [grid, setGrid] = useState<string[][]>(() => {
    // 차트 데이터를 그리드로 추가
    const gridData = [
      ["", ...chartData.labels],
      ...chartData.datasets.map((dataset) => [
        dataset.label,
        ...dataset.data.map(String),
      ]),
    ];
    return gridData;
  });

  const updateChartFromGrid = useCallback(
    (newGrid: string[][]) => {
      try {
        const labels = newGrid[0].slice(1);
        const dataSets = newGrid.slice(1).map((row) => ({
          label: row[0],
          data: row.slice(1).map(Number),
          borderColor: getRandomColor(),
        }));
        setGrid(newGrid);
        setChartData({ labels, dataSets });

        const content = JSON.stringify({ labels, dataSets }, null, 2);
        updateBlockContent(block.id, content);
        debouncedUpdateRef.current?.(block.id, content, block.type);
        updateBlock(block.id, content, block.type);
        setError(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "유효하지 않는 차트 데이터";
        setError(errorMessage);
      }
    },
    [block.id, block.type, updateBlockContent, debouncedUpdateRef, updateBlock]
  );
  const addRow = () => {
    const newRow = ["", ...grid[0].slice(1).map(() => "0")];
    updateChartFromGrid([...grid, newRow]);
  };

  const addColumn = () => {
    const newColumnName = `Col ${grid[0].length}`;
    const newGrid = grid.map((row, index) =>
      index === 0 ? [...row, newColumnName] : [...row, "0"]
    );
    updateChartFromGrid(newGrid);
  };

  const removeRow = (rowIndex: number) => {
    if (grid.length > 2) {
      const newGrid = grid.filter((_, index) => index !== rowIndex);
      updateChartFromGrid(newGrid);
    }
  };
};
