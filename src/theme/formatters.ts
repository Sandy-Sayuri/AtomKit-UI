import type { ReactNode } from "react";

export type AtomKitFormatter<TData extends Record<string, unknown> = Record<string, unknown>> = (
  value: unknown,
  row?: TData,
  rowIndex?: number,
) => ReactNode;

export type AtomKitFormatterMap = Record<string, AtomKitFormatter>;

function onlyDigits(value: unknown) {
  return String(value ?? "").replace(/\D/g, "");
}

function maskFromRight(value: unknown, pattern: string) {
  const digits = onlyDigits(value);
  let cursor = digits.length - 1;
  let result = "";

  for (let index = pattern.length - 1; index >= 0; index -= 1) {
    if (pattern[index] === "0") {
      if (cursor < 0) {
        break;
      }
      result = digits[cursor] + result;
      cursor -= 1;
    } else if (result.length > 0) {
      result = pattern[index] + result;
    }
  }

  return result;
}

export const defaultFormatters: AtomKitFormatterMap = {
  cnpj: (value) => maskFromRight(value, "00.000.000/0000-00"),
  cpf: (value) => maskFromRight(value, "000.000.000-00"),
  currency: (value) =>
    new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(Number(value ?? 0)),
  date: (value) => {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value ?? "") : new Intl.DateTimeFormat("pt-BR").format(date);
  },
  datetime: (value) => {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime())
      ? String(value ?? "")
      : new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(date);
  },
  number: (value) => new Intl.NumberFormat("pt-BR").format(Number(value ?? 0)),
  percentage: (value) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2, style: "percent" }).format(Number(value ?? 0)),
  phone: (value) => {
    const digits = onlyDigits(value);
    return digits.length > 10 ? maskFromRight(digits, "(00) 00000-0000") : maskFromRight(digits, "(00) 0000-0000");
  },
};

