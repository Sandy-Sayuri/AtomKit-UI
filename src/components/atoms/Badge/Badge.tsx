import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: BadgeSize;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  className = "",
  icon,
  iconLeft,
  iconRight,
  size = "md",
  variant = "default",
  ...props
}: BadgeProps) {
  const classes = ["ak-badge", `ak-badge--${variant}`, `ak-badge--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {iconLeft || icon ? <span className="ak-icon ak-badge__icon">{iconLeft ?? icon}</span> : null}
      {children}
      {iconRight ? <span className="ak-icon ak-badge__icon">{iconRight}</span> : null}
    </span>
  );
}
