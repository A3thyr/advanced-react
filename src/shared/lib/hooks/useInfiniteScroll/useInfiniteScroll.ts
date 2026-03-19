import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const triggerElement = triggerRef.current;
    const wrapperElement = wrapperRef.current;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: "0px",
        threshold: 1,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) callback();
      }, options);

      observer.observe(triggerElement);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observer && triggerElement) observer.unobserve(triggerElement);
    };
  }, [triggerRef, wrapperRef, callback]);
}
