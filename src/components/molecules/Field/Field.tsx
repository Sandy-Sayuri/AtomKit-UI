import type { CSSProperties, ReactNode } from "react";
import { Input } from "../../atoms/Input";
import type { InputProps } from "../../atoms/Input";

export interface FormFieldProps extends Omit<InputProps, "error" | "helperText"> {
  error?: string;
  helperText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label: string;
  labelIcon?: ReactNode;
  labelIconPosition?: "left" | "right";
  labelGap?: number | string;
  required?: boolean;
}

export function FormField({
  error,
  helperText,
  id,
  label,
  labelGap,
  labelIcon,
  labelIconPosition = "left",
  required = false,
  ...inputProps
}: FormFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="ak-field">
      <label className="ak-field__label" htmlFor={inputId}>
        <span
          className="ak-label-content"
          style={
            labelGap !== undefined
              ? ({ "--ak-label-gap": typeof labelGap === "number" ? `${labelGap}px` : labelGap } as CSSProperties)
              : undefined
          }
        >
          {labelIcon && labelIconPosition === "left" ? <span className="ak-icon">{labelIcon}</span> : null}
          <span>{label}</span>
          {labelIcon && labelIconPosition === "right" ? <span className="ak-icon">{labelIcon}</span> : null}
        </span>
        {required ? <span className="ak-field__required">*</span> : null}
      </label>
      <Input
        aria-describedby={describedBy}
        id={inputId}
        invalid={Boolean(error)}
        required={required}
        {...inputProps}
      />
      {helperText ? (
        <span className="ak-field__helper" id={helperId}>
          {helperText}
        </span>
      ) : null}
      {error ? (
        <span className="ak-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

export const Field = FormField;
export type FieldProps = FormFieldProps;
