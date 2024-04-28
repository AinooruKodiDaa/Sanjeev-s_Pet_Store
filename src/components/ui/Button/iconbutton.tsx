import React, { PropsWithChildren } from "react";
import { IconButtonProps, ButtonPropsColorOverrides } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { withTooltip } from "./hoc";
import { StyledIconButton } from "./styled";

type CustomIconButtonProps = {
  isLoading: boolean;
  // rest: any;
} & IconButtonProps &
  PropsWithChildren;

const BaseIconButton = React.forwardRef<
  HTMLButtonElement,
  CustomIconButtonProps
>((props, ref) => {
  const { children, isLoading, ...rest } = DefaultProps(props);

  return (
    <StyledIconButton
      ref={ref}
      {...rest}
      sx={rest.sx}
      disabled={isLoading || rest.disabled}
      data-state={
        rest.disabled ? "disabled" : isLoading ? "disabled " : "active"
      }
      onClick={rest.onClick}
    >
      {isLoading ? <CircularProgress size={20} /> : children}
    </StyledIconButton>
  );
});

BaseIconButton.displayName = "IconButton";

const DefaultProps = (props: CustomIconButtonProps) => {
  const defaultProps: CustomIconButtonProps = {
    ...props,
    color: props.color ?? "default",
    size: props.size ??  "small",
    edge: props.edge ?? false,
    disableFocusRipple: props.disableFocusRipple ??  false,
    disableRipple: props.disableRipple || false,
    onClick: props.onClick ??  (() => {}),
  };

  return defaultProps;
};

export const IconButton = withTooltip(BaseIconButton);

