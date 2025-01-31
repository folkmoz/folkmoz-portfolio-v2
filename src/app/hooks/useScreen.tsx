import { useEffect, useState, useCallback } from "react";

// Throttle helper function
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const useSroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  // Throttled scroll handler
  const throttledScrollHandler = throttle(handleScroll, 100);
  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler);
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, []);
  return scrollY;
};

export default function useScreen() {
  const [screen, setScreen] = useState({
    width: 0,
    height: 0,
  });

  const isMobile = screen.width > 0 ? screen.width < 768 : false;

  const handleResize = useCallback(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screen, isMobile };
}
