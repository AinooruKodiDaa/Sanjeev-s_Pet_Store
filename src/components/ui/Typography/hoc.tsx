import { TypographyProps } from "@mui/material";
import Tooltip from "@tippyjs/react";

type TypographyComponent = React.FC<
  { tooltip: string | React.ReactNode } & TypographyProps
>;

export const withTooltip = (Component: TypographyComponent) => {
  const TypographyWithTooltip: React.FC<any> = (props) => {
    const { tooltip } = props;

    if (!tooltip) return <Component {...props} />;

    return (
      <Tooltip content={tooltip}>
        <Component {...props} />
      </Tooltip>
    );
  };

  return TypographyWithTooltip;
};
