export type AtomKitDensity = "compact" | "comfortable";

export interface AtomKitColorTokens {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  danger: string;
  dangerHover: string;
  success: string;
  successHover: string;
  warning: string;
  info: string;
  focus: string;
  onPrimary: string;
  onSecondary: string;
  onDanger: string;
  onSuccess: string;
}

export interface AtomKitTokens {
  colors: AtomKitColorTokens;
  radius: string;
  spacing: string;
  shadow: string;
  fontFamily: string;
  density: AtomKitDensity;
}

export type AtomKitThemeName = "light" | "dark" | "corporate" | "minimal" | "soft" | "terminal";

export type AtomKitTokenOverrides = {
  colors?: Partial<AtomKitColorTokens>;
  radius?: string;
  spacing?: string;
  shadow?: string;
  fontFamily?: string;
  density?: AtomKitDensity;
};

export const lightTheme: AtomKitTokens = {
  colors: {
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    secondary: "#475569",
    secondaryHover: "#334155",
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    text: "#111827",
    textMuted: "#64748b",
    border: "#d9dde3",
    danger: "#dc2626",
    dangerHover: "#b91c1c",
    success: "#16a34a",
    successHover: "#15803d",
    warning: "#d97706",
    info: "#0284c7",
    focus: "rgb(37 99 235 / 18%)",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    onDanger: "#ffffff",
    onSuccess: "#ffffff",
  },
  radius: "6px",
  spacing: "8px",
  shadow: "0 1px 2px rgb(15 23 42 / 8%)",
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  density: "comfortable",
};

export const themes: Record<AtomKitThemeName, AtomKitTokens> = {
  light: lightTheme,
  dark: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: "#60a5fa",
      primaryHover: "#93c5fd",
      secondary: "#94a3b8",
      secondaryHover: "#cbd5e1",
      background: "#0f172a",
      surface: "#111827",
      surfaceMuted: "#1e293b",
      text: "#f8fafc",
      textMuted: "#cbd5e1",
      border: "#334155",
      focus: "rgb(96 165 250 / 24%)",
      onPrimary: "#0f172a",
      onSecondary: "#0f172a",
    },
    shadow: "0 14px 30px rgb(0 0 0 / 28%)",
  },
  corporate: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: "#174ea6",
      primaryHover: "#123f85",
      secondary: "#3f4756",
      secondaryHover: "#2f3642",
      background: "#f4f6f8",
      surface: "#ffffff",
      surfaceMuted: "#eef2f6",
      text: "#172033",
      textMuted: "#5c6677",
      border: "#ccd4df",
      focus: "rgb(23 78 166 / 18%)",
    },
    radius: "4px",
    shadow: "0 2px 8px rgb(23 32 51 / 10%)",
  },
  minimal: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: "#111827",
      primaryHover: "#374151",
      secondary: "#6b7280",
      secondaryHover: "#4b5563",
      background: "#ffffff",
      surface: "#ffffff",
      surfaceMuted: "#f9fafb",
      text: "#111827",
      textMuted: "#6b7280",
      border: "#e5e7eb",
      focus: "rgb(17 24 39 / 14%)",
    },
    radius: "2px",
    shadow: "none",
  },
  soft: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      secondary: "#0f766e",
      secondaryHover: "#115e59",
      background: "#fbf7ff",
      surface: "#ffffff",
      surfaceMuted: "#f6f0ff",
      text: "#27213f",
      textMuted: "#746a8a",
      border: "#e8ddf6",
      focus: "rgb(124 58 237 / 16%)",
    },
    radius: "12px",
    shadow: "0 12px 28px rgb(69 39 111 / 12%)",
  },
  terminal: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: "#22c55e",
      primaryHover: "#86efac",
      secondary: "#38bdf8",
      secondaryHover: "#7dd3fc",
      background: "#050807",
      surface: "#0b120f",
      surfaceMuted: "#111c17",
      text: "#d1fae5",
      textMuted: "#86efac",
      border: "#1f3d2d",
      danger: "#fb7185",
      dangerHover: "#fda4af",
      success: "#22c55e",
      successHover: "#86efac",
      warning: "#facc15",
      info: "#38bdf8",
      focus: "rgb(34 197 94 / 22%)",
      onPrimary: "#03110a",
      onSecondary: "#031019",
      onDanger: "#1f050b",
      onSuccess: "#03110a",
    },
    radius: "0px",
    shadow: "0 0 0 1px rgb(34 197 94 / 20%)",
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    density: "compact",
  },
};

export function mergeTokens(
  theme: AtomKitTokens,
  overrides?: AtomKitTokenOverrides,
): AtomKitTokens {
  if (!overrides) {
    return theme;
  }

  return {
    ...theme,
    ...overrides,
    colors: {
      ...theme.colors,
      ...overrides.colors,
    },
  };
}

export function tokensToCssVariables(tokens: AtomKitTokens): Record<`--ak-${string}`, string> {
  const densityScale = tokens.density === "compact" ? "0.82" : "1";

  return {
    "--ak-color-primary": tokens.colors.primary,
    "--ak-color-primary-hover": tokens.colors.primaryHover,
    "--ak-color-secondary": tokens.colors.secondary,
    "--ak-color-secondary-hover": tokens.colors.secondaryHover,
    "--ak-color-background": tokens.colors.background,
    "--ak-color-surface": tokens.colors.surface,
    "--ak-color-surface-muted": tokens.colors.surfaceMuted,
    "--ak-color-text": tokens.colors.text,
    "--ak-color-text-muted": tokens.colors.textMuted,
    "--ak-color-border": tokens.colors.border,
    "--ak-color-danger": tokens.colors.danger,
    "--ak-color-danger-hover": tokens.colors.dangerHover,
    "--ak-color-success": tokens.colors.success,
    "--ak-color-success-hover": tokens.colors.successHover,
    "--ak-color-warning": tokens.colors.warning,
    "--ak-color-info": tokens.colors.info,
    "--ak-color-focus": tokens.colors.focus,
    "--ak-color-on-primary": tokens.colors.onPrimary,
    "--ak-color-on-secondary": tokens.colors.onSecondary,
    "--ak-color-on-danger": tokens.colors.onDanger,
    "--ak-color-on-success": tokens.colors.onSuccess,
    "--ak-radius": tokens.radius,
    "--ak-spacing": tokens.spacing,
    "--ak-shadow": tokens.shadow,
    "--ak-font-family": tokens.fontFamily,
    "--ak-density-scale": densityScale,
  };
}
