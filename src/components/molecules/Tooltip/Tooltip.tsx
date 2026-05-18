import type { HTMLAttributes, ReactNode } from "react";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  children: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
}

export function Tooltip({ children, className = "", content, icon, ...props }: TooltipProps) {
  const classes = ["ak-tooltip", className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...props}>
      <span className="ak-tooltip__trigger">
        {icon ? <span className="ak-icon">{icon}</span> : null}
        {children}
      </span>
      <span className="ak-tooltip__content" role="tooltip">
        {content}
      </span>
    </span>
  );
}
