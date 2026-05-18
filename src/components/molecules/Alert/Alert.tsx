import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "top";
  title?: string;
  variant?: AlertVariant;
}

export function Alert({ children, className = "", icon, iconPosition = "left", title, variant = "info", ...props }: AlertProps) {
  const classes = ["ak-alert", `ak-alert--${variant}`, `ak-alert--icon-${iconPosition}`, className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="status" {...props}>
      {icon ? <span className="ak-icon ak-alert__icon">{icon}</span> : null}
      <div className="ak-alert__content">
        {title ? <strong className="ak-alert__title">{title}</strong> : null}
        <div className="ak-alert__body">{children}</div>
      </div>
    </div>
  );
}
