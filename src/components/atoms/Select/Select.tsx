import { useEffect, useId, useMemo, useState, type FocusEvent, type ReactNode, type SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg" | "xl";

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  emptyMessage?: ReactNode;
  error?: boolean;
  helperText?: string;
  iconLeft?: ReactNode;
  invalid?: boolean;
  onValueChange?: (value: string, option: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  searchLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  size?: SelectSize;
}

export function Select({
  className = "",
  defaultValue,
  disabled,
  emptyMessage = "Nenhuma opcao encontrada.",
  error = false,
  helperText,
  iconLeft,
  id,
  invalid = false,
  onValueChange,
  options,
  placeholder,
  searchLabel = "Buscar",
  searchable = false,
  searchPlaceholder = "Buscar opcao...",
  size = "md",
  value,
  ...props
}: SelectProps) {
  const isInvalid = invalid || error;
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const shellClasses = ["ak-select-shell", `ak-select-shell--${size}`, className].filter(Boolean).join(" ");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState(String(value ?? defaultValue ?? ""));
  const selectedValue = String(value ?? internalValue);
  const selectedOption = options.find((option) => option.value === selectedValue);
  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return options;
    }

    return options.filter((option) => `${option.label} ${option.value}`.toLowerCase().includes(normalizedSearch));
  }, [options, search]);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(String(value));
    }
  }, [value]);

  function selectOption(option: SelectOption) {
    if (option.disabled) {
      return;
    }

    setInternalValue(option.value);
    setOpen(false);
    setSearch("");
    onValueChange?.(option.value, option);
  }

  function handlePopoverBlur(event: FocusEvent<HTMLSpanElement>) {
    const nextFocusedElement = event.relatedTarget;
    if (nextFocusedElement instanceof Node && event.currentTarget.contains(nextFocusedElement)) {
      return;
    }

    setOpen(false);
  }

  if (!searchable) {
    return (
      <span className="ak-select-group">
        <span className={shellClasses} data-disabled={disabled || undefined} data-invalid={isInvalid || undefined}>
          {iconLeft ? <span className="ak-select-shell__icon">{iconLeft}</span> : null}
          <select
            aria-describedby={helperId ?? props["aria-describedby"]}
            aria-invalid={isInvalid || undefined}
            className="ak-select"
            defaultValue={defaultValue}
            disabled={disabled}
            id={selectId}
            value={value}
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

  return (
    <span className="ak-select-group">
      <span className="ak-select-popover" onBlur={handlePopoverBlur}>
        <button
          aria-controls={`${selectId}-listbox`}
          aria-describedby={helperId ?? props["aria-describedby"]}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={isInvalid || undefined}
          className={shellClasses}
          data-disabled={disabled || undefined}
          data-invalid={isInvalid || undefined}
          disabled={disabled}
          id={selectId}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {iconLeft ? <span className="ak-select-shell__icon">{iconLeft}</span> : null}
          <span className={selectedOption ? "ak-select-value" : "ak-select-value ak-select-value--placeholder"}>
            {selectedOption?.label ?? placeholder ?? "Selecione"}
          </span>
          <span aria-hidden="true" className="ak-select-shell__chevron">
            v
          </span>
        </button>
        {props.name ? <input name={props.name} type="hidden" value={selectedValue} /> : null}
        {open ? (
          <span className="ak-select-dropdown">
            <label className="ak-select-search">
              <span>{searchLabel}</span>
              <input
                autoFocus
                className="ak-select-search__input"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpen(false);
                  }
                }}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                type="search"
                value={search}
              />
            </label>
            <span className="ak-select-options" id={`${selectId}-listbox`} role="listbox">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    aria-selected={option.value === selectedValue}
                    className="ak-select-option"
                    disabled={option.disabled}
                    key={option.value}
                    onClick={() => selectOption(option)}
                    role="option"
                    type="button"
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <span className="ak-select-empty">{emptyMessage}</span>
              )}
            </span>
          </span>
        ) : null}
      </span>
      {helperText ? (
        <span className={isInvalid ? "ak-field__error" : "ak-field__helper"} id={helperId}>
          {helperText}
        </span>
      ) : null}
    </span>
  );
}
