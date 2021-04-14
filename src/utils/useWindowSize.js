import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        if(window.innerWidth > 1200) {
          setSize([window.innerWidth, window.innerHeight - 219]);
        } else {
          setSize([window.innerWidth, window.innerHeight - 2]);
        }
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}