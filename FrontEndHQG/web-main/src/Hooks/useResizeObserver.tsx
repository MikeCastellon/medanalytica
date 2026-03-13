import { useEffect, useState } from "react";

export const useResizeObserver = (ref: any): DOMRectReadOnly | null => {
  const [dimensions, setDimensions] = useState(null)
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries: any) => {
      entries.forEach((entry: any) => {
        setDimensions(entry.contentRect)
      });
    })
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget)
    }
  }, [ref])

  return dimensions;
}