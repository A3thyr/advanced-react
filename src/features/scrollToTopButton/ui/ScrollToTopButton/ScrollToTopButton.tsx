import CircleIcon from "@/shared/assets/icons/circle-up.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Icon } from "@/shared/ui";
import cls from "./ScrollToTopButton.module.scss";

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onCLick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onCLick}
      width={32}
      height={32}
      className={classNames(cls.ScrollToTopButton, {}, [className])}
    />
  );
};
