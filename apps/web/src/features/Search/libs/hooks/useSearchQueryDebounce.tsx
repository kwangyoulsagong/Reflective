import { useEffect, useState } from "react";

const useSearchQueryDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, 500]);
  return debouncedValue;
};
export default useSearchQueryDebounce;
