import { useRef } from "react";

/**
 * Custom hook to handle Fetch API calls.
 *
 * @param {function} cb - this is the callback function which is triggered after timeout.
 * @param {number} delay - after how much time data needs to call
 */
const useDebounce = (cb, delay) => {
  const ref = useRef(null);

  const debounceFunction = (...args) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };

  return debounceFunction;
};

export default useDebounce;
