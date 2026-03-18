import { FC, MutableRefObject, useRef } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import cls from "./PageLayout.module.scss";

interface PageLayoutProps {
  className?: string;
}

export const PageLayout: FC<PageLayoutProps> = ({ className, children }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: () => console.log("mock callback"),
    triggerRef,
    wrapperRef,
  });

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.PageLayout, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
};
