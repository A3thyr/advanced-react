import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ArticleDetails } from "@/entities/Article";
import { ArticleRating } from "@/features/articleRating";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ToggleFeatures } from "@/shared/lib/features";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Card } from "@/shared/ui";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { PageLayout } from "@/widgets";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";
import cls from "./ArticlesDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <PageLayout
        className={classNames(cls.ArticlesDetailsPage, {}, [className])}
      >
        <VStack max gap={16}>
          <ArticlesDetailsPageHeader />
          <ArticleDetails id={id} />
          <ToggleFeatures
            feature={"isArticleRatingEnabled"}
            on={<ArticleRating articleId={id} />}
            off={<Card>{t("Рейтинг статьи coming soon...")}</Card>}
          />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </PageLayout>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailsPage);
