import { useMemo, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { AtomKitContext } from "./context";
import { defaultFormatters, type AtomKitFormatterMap } from "./formatters";
import {
  type AtomKitThemeName,
  type AtomKitTokenOverrides,
  type AtomKitTokens,
  mergeTokens,
  themes,
  tokensToCssVariables,
} from "./tokens";

export interface AtomKitProviderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  formatters?: AtomKitFormatterMap;
  theme?: AtomKitThemeName | AtomKitTokens;
  tokens?: AtomKitTokenOverrides;
}

export function AtomKitProvider({
  children,
  className = "",
  formatters,
  style,
  theme = "light",
  tokens,
  ...props
}: AtomKitProviderProps) {
  const baseTheme = typeof theme === "string" ? themes[theme] : theme;
  const mergedTokens = mergeTokens(baseTheme, tokens);
  const cssVariables = tokensToCssVariables(mergedTokens);
  const classes = ["ak-theme", className].filter(Boolean).join(" ");
  const contextValue = useMemo(
    () => ({
      formatters: {
        ...defaultFormatters,
        ...formatters,
      },
    }),
    [formatters],
  );

  return (
    <AtomKitContext.Provider value={contextValue}>
      <div
        className={classes}
        data-ak-density={mergedTokens.density}
        data-ak-theme={typeof theme === "string" ? theme : "custom"}
        style={{ ...cssVariables, ...style } as CSSProperties}
        {...props}
      >
        {children}
      </div>
    </AtomKitContext.Provider>
  );
}
