import { useEffect, useState } from "react";

function useDebounce(value, delay = 100) {
  const [debouncedvalue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return debouncedvalue;
}

export default useDebounce;
