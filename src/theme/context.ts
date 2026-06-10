import { createContext, useContext } from "react";
import { defaultFormatters, type AtomKitFormatterMap } from "./formatters";

export interface AtomKitContextValue {
  formatters: AtomKitFormatterMap;
}

export const AtomKitContext = createContext<AtomKitContextValue>({
  formatters: defaultFormatters,
});

export function useAtomKit() {
  return useContext(AtomKitContext);
}

