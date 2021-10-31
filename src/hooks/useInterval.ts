import { useState, useEffect, useRef } from 'react'

export const useInterval = (delay: number = 1000) => {
  const [count, setCount] = useState(0)
  const interval = useRef<NodeJS.Timeout | null>(null);
  interval.current = setTimeout(() => setCount(count + 1), delay);

  useEffect(() => {
    return () => clearTimeout(interval.current as NodeJS.Timeout);
  }, []);

  return { count }
}