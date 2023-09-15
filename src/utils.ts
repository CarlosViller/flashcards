import { useEffect, useState } from "react";
import { placeholderQA } from "./constants";

export function getRandomCardPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholderQA.length);

  return placeholderQA[randomIndex];
}

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);

    media.onchange = (e: MediaQueryListEvent) => setTargetReached(e.matches);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }
  }, []);

  return targetReached;
};
