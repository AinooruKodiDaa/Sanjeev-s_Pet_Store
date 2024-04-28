import Tooltip from "@tippyjs/react";


type ButtonComponent = React.FC<any>;

export const withTooltip = (Component: ButtonComponent) => {
  const ButtonWithTooltip: React.FC<any> = (props) => {
    const { tooltip } = props;

    if (!tooltip) return <Component {...props} />;

    return (
      <Tooltip content={tooltip}>
        <Component {...props} />
      </Tooltip>
    );
  };

  return ButtonWithTooltip;
};
