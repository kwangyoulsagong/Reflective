import React from "react";
import { Line } from "react-chartjs-2";
import { Edit2 } from "lucide-react";
import { ChartPreviewProps } from "../../../../types/BlockEditor/Chart";
import Button from "../Common/Button/Button";

const Preview: React.FC<ChartPreviewProps> = ({ data, onEdit }) => {
  return (
    <div
      onClick={onEdit}
      className="cursor-pointer hover:opacity-90 transition-opacity relative group"
    >
      <Line data={data} width={800} height={400} />
      <Button
        variant="ghost"
        icon={Edit2}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/50 rounded-full"
        onClick={onEdit}
      />
    </div>
  );
};
export default Preview;
