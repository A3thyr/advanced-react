import { FC, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { RoutePath } from "shared/config/router/router.config";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useHover } from "shared/lib/hooks/useHover/useHover";
import {
  AppLink,
  Avatar,
  Button,
  Card,
  Icon,
  Text,
  ThemeButton,
} from "shared/ui";
import { TextSize } from "shared/ui/Text/Text";
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = ({
  className,
  article,
  target,
  view = ArticleView.SMALL,
}) => {
  const [isHover, bindHover] = useHover();
  const { t } = useTranslation();
  // const navigate = useNavigate();

  // const onOpenArticle = useCallback(() => {
  //   navigate();
  // }, [article.id, navigate]);

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  // delete THAT
  // console.log(isHover);

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink
              target={target}
              to={RoutePath.articles_details + article.id}
            >
              <Button
                // onClick={onOpenArticle}
                theme={ThemeButton.OUTLINE}
              >
                {t("more")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
        {/* {article.title} */}
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.articles_details + article.id}
      // {...bindHover}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {/* <Text text={article.type.join(", ")} className={cls.types} /> */}
          {types}
          {views}
        </div>
        <Text title={article.title} className={cls.title} size={TextSize.S} />
      </Card>
    </AppLink>
  );
};
