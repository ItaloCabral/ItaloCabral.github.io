import { useEffect, useState } from "react";

interface TypingOptions {
  speed?: number;
  delay?: number;
}

export function useTypingEffect(text: string, options: TypingOptions = {}) {
  const { speed = 24, delay = 500 } = options;
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplayed(text);
      setIsComplete(true);
      return;
    }

    setDisplayed("");
    setIsComplete(false);

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const delayId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayed, isComplete };
}
