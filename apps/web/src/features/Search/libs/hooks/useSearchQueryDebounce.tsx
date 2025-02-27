import { useEffect, useState } from "react";

const useSearchQueryDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [value, 300]);
  return debouncedValue;
};
export default useSearchQueryDebounce;
