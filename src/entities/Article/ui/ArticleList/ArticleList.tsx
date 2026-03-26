import { FC, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";
import { List, WindowScroller } from "react-virtualized";
import { ListRowProps } from "react-virtualized/dist/es/List";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Text } from "shared/ui";
import { PAGE_ID } from "widgets/PageLayout/ui/PageLayout";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import cls from "./ArticleList.module.scss";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
    ));
};

export const ArticleList: FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  target,
  view = ArticleView.SMALL,
}) => {
  const { t } = useTranslation("articles");

  const rowRender = ({
    index,
    key,
    style,
    itemsPerRow,
  }: ListRowProps & { itemsPerRow: number }) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <ArticleListItem
          key={articles[i].id}
          article={articles[i]}
          view={view}
          target={target}
          className={cls.card}
        />,
      );
    }

    return (
      <div key={key} style={style} className={cls.row}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text title={t("not-found")} />
      </div>
    );
  }
  return (
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        width,
        height,
        registerChild,
        scrollTop,
        isScrolling,
        onChildScroll,
      }) => {
        const CARD_WIDTH = 230;
        const GAP = 30;

        const isBig = view === ArticleView.BIG;
        const itemsPerRow = isBig
          ? 1
          : Math.max(1, Math.floor((width ?? 700) / (CARD_WIDTH + GAP)));
        const rowCount = isBig
          ? articles.length
          : Math.ceil(articles.length / itemsPerRow);

        return (
          <div
            ref={registerChild}
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          >
            <List
              autoHeight
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              height={height ?? 700}
              rowCount={rowCount}
              rowHeight={isBig ? 700 : 330}
              width={width ? width - 80 : 700}
              rowRenderer={(props) => rowRender({ ...props, itemsPerRow })}
            />
            {isLoading && getSkeletons(view)}
          </div>
        );
      }}
    </WindowScroller>
  );
};
