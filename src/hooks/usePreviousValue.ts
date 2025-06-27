// 1. usePrevious
// Problem: Track the previous value of a variable.

import { useEffect, useRef } from "react";

// const prevCount = usePrevious(count);
export const usePreviousValue = <T>(initialValue: T) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = initialValue;
  }, [initialValue]);

  return ref.current;
};
