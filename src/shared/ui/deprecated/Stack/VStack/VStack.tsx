import { FC } from "react";
import { Flex, FlexProps } from "../Flex/Flex";

type VStackProps = Omit<FlexProps, "direction">;

/** @deprecated */
export const VStack: FC<VStackProps> = (props) => {
  return <Flex direction="column" {...props} />;
};
