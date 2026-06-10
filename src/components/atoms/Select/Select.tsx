import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg" | "xl";

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean;
  helperText?: string;
  iconLeft?: ReactNode;
  invalid?: boolean;
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
}

export function Select({
  className = "",
  disabled,
  error = false,
  helperText,
  iconLeft,
  id,
  invalid = false,
  options,
  placeholder,
  size = "md",
  ...props
}: SelectProps) {
  const isInvalid = invalid || error;
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const shellClasses = ["ak-select-shell", `ak-select-shell--${size}`, className].filter(Boolean).join(" ");

  return (
    <span className="ak-select-group">
      <span className={shellClasses} data-disabled={disabled || undefined} data-invalid={isInvalid || undefined}>
        {iconLeft ? <span className="ak-select-shell__icon">{iconLeft}</span> : null}
        <select
          aria-describedby={helperId ?? props["aria-describedby"]}
          aria-invalid={isInvalid || undefined}
          className="ak-select"
          disabled={disabled}
          id={selectId}
          {...props}
        >
          {placeholder ? (
            <option disabled value="">
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="ak-select-shell__chevron">
          v
        </span>
      </span>
      {helperText ? (
        <span className={isInvalid ? "ak-field__error" : "ak-field__helper"} id={helperId}>
          {helperText}
        </span>
      ) : null}
    </span>
  );
}
