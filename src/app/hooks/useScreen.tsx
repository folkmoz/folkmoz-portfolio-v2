import { useEffect, useState } from "react";

export default function useScreen() {
  const [screen, setScreen] = useState({
    width: 0,
    height: 0,
  });

  const [scrollY, setScrollY] = useState(0);

  const isMobile = screen.width > 0 ? screen.width < 768 : false;

  const handleResize = () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { screen, isMobile, scrollY };
}
