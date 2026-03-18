import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollOptions {
  callback: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    const options = {
      root: wrapperRef.current,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) console.log("intersected");
    }, options);

    observer.observe(triggerRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observer) observer.unobserve(triggerRef.current);
    };
  }, [triggerRef, wrapperRef]);
}
