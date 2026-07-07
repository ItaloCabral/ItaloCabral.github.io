import { useEffect, useState } from "react";

const BOTTOM_THRESHOLD = 120;
const STORAGE_KEY = "portfolio-share-hint-dismissed";

export function useShareHintEligible() {
  const [nearBottom, setNearBottom] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "1",
  );

  useEffect(() => {
    const onScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      setNearBottom(scrollY + innerHeight >= scrollHeight - BOTTOM_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const dismissHint = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  const showHint = nearBottom && !dismissed;

  return { showHint, dismissHint };
}
