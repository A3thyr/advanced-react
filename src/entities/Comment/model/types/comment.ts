import { User } from "entities/User";

export interface ArticleComment {
  id: string;
  user: User;
  text: string;
}
