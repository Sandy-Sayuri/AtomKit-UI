import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "../Button";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function IconButton({
  className = "",
  icon,
  label,
  size = "md",
  type = "button",
  variant = "ghost",
  ...props
}: IconButtonProps) {
  const classes = ["ak-icon-button", `ak-icon-button--${size}`, `ak-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button aria-label={label} className={classes} title={label} type={type} {...props}>
      <span className="ak-icon">{icon}</span>
    </button>
  );
}
