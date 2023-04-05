import { useEffect, useState } from "react";

const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", (e) =>
      setIsMobile(window.innerWidth > 768 ? 0 : 1)
    );

    return () => window.removeEventListener("resize", (e) => {});
  }, []);
  return isMobile;
};

export default useMobileView;
