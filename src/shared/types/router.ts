import { RouteProps } from "react-router-dom";
// edge case, потом сделать рефактор
// eslint-disable-next-line aetherys-custom-plugin/layer-imports
import { UserRole } from "@/entities/User";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
