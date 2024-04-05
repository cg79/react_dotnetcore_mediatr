import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

function useDebounce<T extends AnyFunction>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [timer, setTimer] = useState<any | null>(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return function debounced(...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);

    setTimer(newTimer);
  };
}

export default useDebounce;
