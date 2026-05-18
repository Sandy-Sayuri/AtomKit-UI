import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg" | "xl";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  helperText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  invalid?: boolean;
  size?: InputSize;
}

export function Input({
  className = "",
  disabled,
  error = false,
  helperText,
  id,
  iconLeft,
  iconRight,
  invalid = false,
  size = "md",
  ...props
}: InputProps) {
  const isInvalid = invalid || error;
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const shellClasses = ["ak-input-shell", `ak-input-shell--${size}`, className].filter(Boolean).join(" ");

  return (
    <span className="ak-input-group">
      <span className={shellClasses} data-disabled={disabled || undefined} data-invalid={isInvalid || undefined}>
        {iconLeft ? <span className="ak-input-shell__icon">{iconLeft}</span> : null}
        <input
          aria-describedby={helperId ?? props["aria-describedby"]}
          aria-invalid={isInvalid || undefined}
          className="ak-input"
          disabled={disabled}
          id={inputId}
          {...props}
        />
        {iconRight ? <span className="ak-input-shell__icon">{iconRight}</span> : null}
      </span>
      {helperText ? (
        <span className={isInvalid ? "ak-field__error" : "ak-field__helper"} id={helperId}>
          {helperText}
        </span>
      ) : null}
    </span>
  );
}
