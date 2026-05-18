import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  gap?: number | string;
  icon?: ReactNode;
  iconBottom?: ReactNode;
  iconLeft?: ReactNode;
  iconOnly?: boolean;
  iconRight?: ReactNode;
  iconTop?: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className = "",
  disabled,
  fullWidth = false,
  gap,
  icon,
  iconBottom,
  iconLeft,
  iconOnly = false,
  iconRight,
  iconTop,
  loading = false,
  size = "md",
  style,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const hasVerticalIcon = Boolean(iconTop || iconBottom);
  const classes = [
    "ak-button",
    `ak-button--${variant}`,
    `ak-button--${size}`,
    fullWidth ? "ak-button--full-width" : "",
    iconOnly ? "ak-button--icon-only" : "",
    hasVerticalIcon ? "ak-button--vertical" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const buttonStyle = gap !== undefined ? ({ ...style, "--ak-button-gap": typeof gap === "number" ? `${gap}px` : gap } as CSSProperties) : style;
  const leadingIcon = iconLeft ?? icon;

  return (
    <button aria-busy={loading || undefined} className={classes} disabled={disabled || loading} style={buttonStyle} type={type} {...props}>
      {iconTop ? <span className="ak-icon ak-button__icon">{iconTop}</span> : null}
      {loading ? <span aria-hidden="true" className="ak-button__spinner" /> : leadingIcon ? <span className="ak-icon ak-button__icon">{leadingIcon}</span> : null}
      {iconOnly ? <span className="ak-button__label ak-button__label--sr">{children}</span> : <span className="ak-button__label">{children}</span>}
      {iconRight ? <span className="ak-icon ak-button__icon">{iconRight}</span> : null}
      {iconBottom ? <span className="ak-icon ak-button__icon">{iconBottom}</span> : null}
    </button>
  );
}
