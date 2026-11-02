import { memo } from "react";
import cls from "./ScrollToolbar.module.scss";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ScrollToTopButton } from "@/features/scrollToTopButton";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      justfify="center"
      align="center"
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
