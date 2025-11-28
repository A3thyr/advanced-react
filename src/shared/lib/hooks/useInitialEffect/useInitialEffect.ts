import { useEffect } from "react";

export function useInitialEffect(callback: () => void) {
  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      callback();
    }
    // callback's gonna be called only once, so deps array is empty
  }, []);
}
