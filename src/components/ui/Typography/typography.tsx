import { Typography as MUITypography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { withTooltip } from "./hoc";

type CustomTypographyProps = TypographyProps & PropsWithChildren;

const BaseTypography: React.FC<CustomTypographyProps> = (props) => {
  const { children, ...rest } = props;
  return <MUITypography {...rest}>{children}</MUITypography>;
};

export const Typography = withTooltip(BaseTypography);
