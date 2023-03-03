import { useState, useEffect } from "react";

const useMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width < 620);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    setIsMobile(width < 620);
  }, [width]);

  return {
    isMobile
  };
};

export default useMobile;
