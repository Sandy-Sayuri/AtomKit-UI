import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
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
  theme?: AtomKitThemeName | AtomKitTokens;
  tokens?: AtomKitTokenOverrides;
}

export function AtomKitProvider({
  children,
  className = "",
  style,
  theme = "light",
  tokens,
  ...props
}: AtomKitProviderProps) {
  const baseTheme = typeof theme === "string" ? themes[theme] : theme;
  const mergedTokens = mergeTokens(baseTheme, tokens);
  const cssVariables = tokensToCssVariables(mergedTokens);
  const classes = ["ak-theme", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-ak-density={mergedTokens.density}
      data-ak-theme={typeof theme === "string" ? theme : "custom"}
      style={{ ...cssVariables, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
