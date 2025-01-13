// types.ts
export interface ImageSizeSliderProps {
  onChange?: (size: number) => void;
  initialValue?: number;
}

import React, { useState } from "react";

const ImageSizeSlider: React.FC<ImageSizeSliderProps> = ({
  onChange,
  initialValue = 100,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-2 bg-black/90 text-white p-2 rounded-lg w-48">
      <input
        type="range"
        min="10"
        max="100"
        value={value}
        onChange={handleChange}
        className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
      />
      <span className="text-sm font-medium min-w-[3ch]">{value}%</span>
    </div>
  );
};

export default ImageSizeSlider;
