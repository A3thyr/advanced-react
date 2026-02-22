import { FunctionComponent, SVGAttributes } from "react";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  ns?: string; // декларировать более подробный и точный тип
  authOnly?: boolean;
}
