import { useRef, useState } from 'react';

const useResizable = (initialWidth, parentRef) => {
  const [width, setWidth] = useState(initialWidth);
  const resizeRequestRef = useRef(null);

  const handleMouseDown = () => {
    const handleMouseMove = (moveEvent) => {
      if (resizeRequestRef.current) return;
3
      resizeRequestRef.current = requestAnimationFrame(() => {
        if (parentRef.current) {
          const parentRect = parentRef.current.getBoundingClientRect(); // Get the parent element's bounding rectangle
          const mouseX = moveEvent.clientX - parentRect.left; // Calculate mouse position relative to parent
          const newWidth = (mouseX / parentRect.width) * 100; // Calculate width as a percentage of the parent

          if (newWidth > 20 && newWidth < 90) {
            setWidth(newWidth);
          }
        }
        resizeRequestRef.current = null;
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (resizeRequestRef.current) {
        cancelAnimationFrame(resizeRequestRef.current);
        resizeRequestRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return [width, handleMouseDown];
};

export default useResizable;
