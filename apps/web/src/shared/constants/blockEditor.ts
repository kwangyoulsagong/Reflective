import { ListOptions } from "../../entities/BlockEditor/model/type/List";

export const EDITOR_CONFIG = {
  DEBOUNCE_DELAY: 300,
  DEFAULT_WRITE_LIST_MARKER: "•",
  DEFAULT_LIST_MARKER: "• ",
  DEFAULT_NUMBERED_MARKER: "1. ",
} as const;
export const INITIAL_CHART_DATA = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3, 10],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};
export const DEFAULT_OPTIONS: Required<ListOptions> = {
  maxLevel: 5,
  minItems: 1,
  maxItems: 1000,
  allowCollapse: true,
};

export const IMAGE_URL_PATTERN = /\.(jpeg|jpg|gif|png|svg|avif|webp)$/i;
export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
