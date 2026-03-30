import { ArticleDetails } from "entities/Article";
import { ArticleRecommendationsList } from "features/articleRecommendationsList";
import { FC, memo } from "react";
// import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { VStack } from "shared/ui/Stack";
import { PageLayout } from "widgets";
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
  // const { t } = useTranslation("article_details");
  const { id } = useParams<{ id: string }>();

  // if (!id) {
  //   return (
  //     <PageLayout
  //       className={classNames(cls.ArticlesDetailsPage, {}, [className])}
  //     >
  //       {t("not-found")}
  //     </PageLayout>
  //   );
  // }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <PageLayout
        className={classNames(cls.ArticlesDetailsPage, {}, [className])}
      >
        <VStack max gap={16}>
          <ArticlesDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </PageLayout>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailsPage);
