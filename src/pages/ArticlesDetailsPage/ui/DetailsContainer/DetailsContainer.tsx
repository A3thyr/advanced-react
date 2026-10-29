import { FC } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";
import { Card } from "@/shared/ui/redesigned/Card/Card";

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<DetailsContainerProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <Card max fullHeight border="round" className={className} padding={24}>
      <ArticleDetails id={id} />
    </Card>
  );
};
