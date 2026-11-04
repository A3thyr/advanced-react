import { FC, memo } from "react";
import { useParams } from "react-router-dom";

import { ArticleRating } from "@/features/articleRating";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { PageLayout } from "@/widgets";

import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";
import { articleDetailsPageReducer } from "../../model/slices";
import { AdditionalInfoContainer } from "../AdditionalInfoContainer/AdditionalInfoContainer";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { DetailsContainer } from "../DetailsContainer/DetailsContainer";
import cls from "./ArticlesDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <StickyContentLayout
        content={
          <PageLayout
            className={classNames(cls.ArticlesDetailsPage, {}, [className])}
          >
            <VStack max gap={16}>
              <DetailsContainer />
              <ArticleRating articleId={id} />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </PageLayout>
        }
        right={<AdditionalInfoContainer />}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailsPage);
