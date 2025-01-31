import React from "react";
import { Plus, Trash2 } from "lucide-react";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import { TableEditorProps } from "../../../../../../entities/BlockEditor/model/type/Chart";

export const TableEditor: React.FC<TableEditorProps> = ({
  grid,
  onCellChange,
  onAddRow,
  onAddColumn,
  onRemoveRow,
  onRemoveColumn,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {grid[0].map((cell, colIndex) => (
              <th key={colIndex} className="border border-gray-200 p-2">
                <div className="relative group">
                  <Input
                    type="text"
                    value={cell}
                    onChange={(e) => onCellChange(0, colIndex, e.target.value)}
                    placeholder="열"
                    fullWidth
                  />
                  {colIndex > 0 && (
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onRemoveColumn(colIndex)}
                      className="absolute -top-2 right-0 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </div>
              </th>
            ))}
            <th className="p-2 w-12">
              <Button
                variant="secondary"
                size="sm"
                icon={Plus}
                onClick={onAddColumn}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {grid.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border border-gray-200 p-2">
                  <Input
                    type={colIndex === 0 ? "text" : "number"}
                    value={cell}
                    onChange={(e) =>
                      onCellChange(rowIndex + 1, colIndex, e.target.value)
                    }
                    placeholder={colIndex === 0 ? "라벨" : "0"}
                    fullWidth
                  />
                </td>
              ))}
              <td className="p-2 w-12">
                <Button
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  onClick={() => onRemoveRow(rowIndex + 1)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={grid[0].length + 1} className="p-2">
              <Button
                variant="secondary"
                icon={Plus}
                onClick={onAddRow}
                fullWidth
              >
                데이터 추가
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
