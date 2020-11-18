import { useCallback, useRef } from 'react';

const DEFAULT_TIMEOUT = 250;

export type Debounce = (callback: () => unknown) => unknown;

export type UseDebounce = (timeout?: number) => Debounce;

const useDebounce: UseDebounce = (timeout = DEFAULT_TIMEOUT) => {
  const timeoutRef = useRef<number>(0);

  return useCallback(
    (callback) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(callback, timeout);
    },
    [timeoutRef]
  );
};

export default useDebounce;
