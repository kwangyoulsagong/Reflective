import React, { useCallback, useState } from "react";
import { Line } from "react-chartjs-2";
import { Eye, Edit2, Plus, Trash2 } from "lucide-react";
import { ChartEditorProps } from "../../../types/BlockEditor/Chart";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
  }[];
}

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const ChartEditor = React.memo<ChartEditorProps>(
  ({
    block,
    updateBlock,
    updateBlockContent,
    debouncedUpdateRef,
    isEditing,
    setIsEditing,
  }) => {
    const [chartData, setChartData] = useState<ChartData>({
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          borderColor: getRandomColor(),
        },
      ],
    });

    const [error, setError] = useState<string | null>(null);

    const [grid, setGrid] = useState<string[][]>(() => {
      // Convert chartData to a grid
      const gridData = [
        ["", ...chartData.labels],
        ...chartData.datasets.map((dataset) => [
          dataset.label,
          ...dataset.data.map(String),
        ]),
      ];
      return gridData;
    });

    // Update chart data when grid changes
    const updateChartFromGrid = useCallback(
      (newGrid: string[][]) => {
        try {
          const labels = newGrid[0].slice(1);
          const datasets = newGrid.slice(1).map((row) => ({
            label: row[0],
            data: row.slice(1).map(Number),
            borderColor: getRandomColor(),
          }));

          setGrid(newGrid);
          setChartData({ labels, datasets });

          // Update block content
          const content = JSON.stringify({ labels, datasets }, null, 2);
          updateBlockContent(block.id, content);
          debouncedUpdateRef.current?.(block.id, content, block.type);
          updateBlock(block.id, content, block.type);

          setError(null);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Invalid chart data";
          setError(errorMessage);
        }
      },
      [
        block.id,
        block.type,
        updateBlockContent,
        debouncedUpdateRef,
        updateBlock,
      ]
    );

    // Grid cell change handler
    const handleCellChange = (
      rowIndex: number,
      colIndex: number,
      value: string
    ) => {
      const newGrid = grid.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
          : row
      );
      updateChartFromGrid(newGrid);
    };

    // Add new row
    const addRow = () => {
      const newRow = ["", ...grid[0].slice(1).map(() => "0")];
      updateChartFromGrid([...grid, newRow]);
    };

    // Add new column
    const addColumn = () => {
      const newColumnName = `Col ${grid[0].length}`;
      const newGrid = grid.map((row, index) =>
        index === 0 ? [...row, newColumnName] : [...row, "0"]
      );
      updateChartFromGrid(newGrid);
    };

    // Remove row
    const removeRow = (rowIndex: number) => {
      if (grid.length > 2) {
        const newGrid = grid.filter((_, index) => index !== rowIndex);
        updateChartFromGrid(newGrid);
      }
    };

    // Remove column
    const removeColumn = (colIndex: number) => {
      if (grid[0].length > 2) {
        const newGrid = grid.map((row) =>
          row.filter((_, index) => index !== colIndex)
        );
        updateChartFromGrid(newGrid);
      }
    };

    return (
      <div className="relative group">
        {isEditing ? (
          <div className="space-y-4">
            {/* Editable Grid */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {grid.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`
                        ${rowIndex === 0 ? "bg-gray-100" : "hover:bg-gray-50"}
                        transition-colors
                      `}
                    >
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border p-1">
                          {rowIndex === 0 || colIndex === 0 ? (
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) =>
                                handleCellChange(
                                  rowIndex,
                                  colIndex,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent outline-none text-center"
                              placeholder={rowIndex === 0 ? "Column" : "Label"}
                            />
                          ) : (
                            <input
                              type="number"
                              value={cell}
                              onChange={(e) =>
                                handleCellChange(
                                  rowIndex,
                                  colIndex,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent outline-none text-center"
                              placeholder="0"
                            />
                          )}
                        </td>
                      ))}
                      {rowIndex === 0 ? (
                        <td className="p-1">
                          <button
                            onClick={addColumn}
                            className="text-blue-500 hover:bg-blue-100 rounded p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </td>
                      ) : (
                        <td className="p-1 flex items-center">
                          <button
                            onClick={() => removeRow(rowIndex)}
                            className="text-red-500 hover:bg-red-100 rounded p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={grid[0].length + 1} className="p-1">
                      <button
                        onClick={addRow}
                        className="w-full flex items-center justify-center text-blue-500 hover:bg-blue-100 rounded p-2"
                      >
                        <Plus size={16} className="mr-2" /> Add Dataset
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Error Display */}
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            {/* Preview Button */}
            <button
              onClick={() => setIsEditing(false)}
              className="
                w-full 
                p-2 
                bg-blue-500 
                text-white 
                rounded 
                hover:bg-blue-600 
                transition-colors 
                duration-200 
                flex 
                items-center 
                justify-center
                gap-2
              "
            >
              <Eye size={16} />
              Preview Chart
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="
              cursor-pointer 
              hover:opacity-90 
              transition-opacity 
              relative 
              group
            "
          >
            <Line data={chartData} />
            <div
              className="
                absolute 
                top-2 
                right-2 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-200
              "
            >
              <Edit2
                size={20}
                className="text-gray-600 bg-white/50 rounded-full p-1"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ChartEditor;
