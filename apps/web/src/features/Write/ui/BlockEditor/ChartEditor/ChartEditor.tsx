import React from "react";
import { Eye } from "lucide-react";
import { TableEditor } from "./TableEditor/TableEditor";
import Error from "./Error/Error";
import Button from "./Common/Button/Button";
import Preview from "./Preview/Preview";
import { ChartEditorProps } from "../../../../../entities/BlockEditor/model/type/Chart";
import useChartData from "../../../libs/hooks/BlockEditor/Chart/useChartData";
import useGridChart from "../../../libs/hooks/BlockEditor/Chart/useGridChart";

const ChartEditor = React.memo<ChartEditorProps>(
  ({
    block,
    updateBlock,
    updateBlockContent,
    debouncedUpdateRef,
    isEditing,
    setIsEditing,
  }) => {
    // 초기 상태를 block.content에서 파싱하도록 변경
    const { chartData, setChartData } = useChartData(block);

    const {
      grid,
      error,
      handleCellChange,
      addRow,
      addColumn,
      removeRow,
      removeColumn,
    } = useGridChart(
      chartData,
      block,
      updateBlockContent,
      debouncedUpdateRef,
      updateBlock,
      setChartData
    );

    return (
      <div className="relative w-full max-w-4xl mx-auto">
        {isEditing ? (
          <div className="space-y-4">
            <TableEditor
              grid={grid}
              onCellChange={handleCellChange}
              onAddRow={addRow}
              onAddColumn={addColumn}
              onRemoveRow={removeRow}
              onRemoveColumn={removeColumn}
            />

            {error && <Error message={error} />}

            <Button
              variant="primary"
              icon={Eye}
              onClick={() => setIsEditing(false)}
              fullWidth
            >
              차트 미리보기
            </Button>
          </div>
        ) : (
          <Preview data={chartData} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    );
  }
);

export default ChartEditor;
