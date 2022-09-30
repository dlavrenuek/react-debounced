import { useCallback, useRef } from 'react';

const DEFAULT_TIMEOUT = 250;

type Callback = () => void;
export type Debounce = (callback: Callback) => void;

type UseDebounce = (timeout?: number) => Debounce;

const useDebounce: UseDebounce = (timeout = DEFAULT_TIMEOUT) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (callback: Callback) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(callback, timeout);
    },
    [timeoutRef, timeout]
  );
};

export default useDebounce;
