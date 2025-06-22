import { useCallback, useRef, useEffect } from 'react';

const useThrottle = (callback, delay, options = { leading: true, trailing: true }) => {
  const lastExecRef = useRef(0);
  const timerRef = useRef(null);
  const pendingArgsRef = useRef(null);
  
  const throttledFn = useCallback((...args) => {
    const executeCallback = () => {
      lastExecRef.current = Date.now();
      callback(...pendingArgsRef.current);
      pendingArgsRef.current = null;
    };
    const now = Date.now();
    const elapsed = now - lastExecRef.current;
    
    pendingArgsRef.current = args;

    if (!timerRef.current) {
      if (options.leading && elapsed > delay) {
        executeCallback();
      } else {
        timerRef.current = setTimeout(() => {
          if (options.trailing) {
            executeCallback();
          }
          timerRef.current = null;
        }, Math.max(delay - elapsed, 0));
      }
    }
  }, [callback, delay, options.leading, options.trailing]);


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return throttledFn;
};

export default useThrottle;