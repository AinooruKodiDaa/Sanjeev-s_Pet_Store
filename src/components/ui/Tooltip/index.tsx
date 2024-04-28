import React, { ReactNode } from "react";
import { Tooltip as MUITooltip, TooltipProps } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Import Tippy styles

// interface TooltipProps {
//   content: ReactNode | (() => ReactNode);
//   children: React.ReactElement;
//   placement?: 'top' | 'bottom' | 'left' | 'right';
//   delay?:number;
//   duration?:number;

// }

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  title,
}) => {
  return (
    <MUITooltip
      // content={typeof content === "function" ? content() : content}
      content={content}
      
      title={title}
      placement={placement}
      arrow={true}
      enterDelay={200}
      leaveDelay={200}
    >
      {children}
    </MUITooltip>
  );
};
