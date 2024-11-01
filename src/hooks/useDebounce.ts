import { useEffect, useCallback, useRef } from "react";

// Generic type T for the function parameters
type AnyFunction = (...args: any[]) => any;

/**
 * A custom hook that returns a debounced version of the provided function.
 * @template T - The type of function to debounce
 * @param {T} callback - The function to debounce
 * @param {number} delay - The delay in milliseconds (default: 300)
 * @returns {T} - A debounced version of the callback function
 */
const useDebounce = <T extends AnyFunction>(
  callback: T,
  delay = 300
): ((...args: Parameters<T>) => void) => {
  // Use useRef to store the timeout ID so it persists across renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use useCallback to memoize the debounced function
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export default useDebounce;
