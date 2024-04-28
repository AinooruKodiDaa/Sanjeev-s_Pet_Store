import React, { PropsWithChildren } from "react";
import { ButtonBaseProps, ButtonProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography, { TypographyProps } from "@mui/material/Typography";

import { withTooltip } from "./hoc";
import { StyledButton } from "./styled";

type CustomButtonProps = {
  isLoading: boolean;
  // rest: any;
  typographyProps: TypographyProps;
} & ButtonProps &
  PropsWithChildren;

const BaseButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (props, ref) => {
    const {
      children,
      typographyProps,
      isLoading,
      ...rest
    } = DefaultProps(props);

    return (
      <StyledButton
        ref={ref}
        {...rest}
        disabled={isLoading || rest.disabled}
        data-state={
          rest.disabled ? "disabled" : isLoading ? "disabled " : "active"
        }
        variant={rest.variant}
        size={rest.size}
        color={rest.color}
        disableElevation={rest.disableElevation}
        disableFocusRipple={rest.disableFocusRipple}
        disableRipple={rest.disableRipple}
        fullWidth={rest.fullWidth}
        startIcon={rest.startIcon}
        endIcon={rest.endIcon}
        onClick={rest.onClick}
      >
        {typographyProps ? (
          <Typography {...typographyProps}>{children}</Typography>
        ) : isLoading ? (
          <CircularProgress size={20} />
        ) : (
          children
        )}
      </StyledButton>
    );
  }
);

BaseButton.displayName = "Button";

const DefaultProps = (props: CustomButtonProps) => {
  const defaultProps: CustomButtonProps = {
    ...props,
    color: props.color || "primary",
    size: props.size || "small",
    variant: props.variant || "contained",
    disableElevation: props.disableElevation || false,
    disableFocusRipple: props.disableFocusRipple || false,
    disableRipple: props.disableRipple || false,
    fullWidth: props.fullWidth || false,
    onClick: props.onClick || (() => {}),
  };

  return defaultProps;
};

export const Button = withTooltip(BaseButton);
