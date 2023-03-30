import { useEffect, useState } from "react";

const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", (e) =>
      setIsMobile(window.innerWidth > 768 ? 0 : 1)
    );

    return () => window.removeEventListener("resize", (e) => {});
  }, []);
  return isMobile;
};

export default useMobileView;
