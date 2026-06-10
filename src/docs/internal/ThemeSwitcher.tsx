import type { AtomKitThemeName } from "../../theme";
import { Button } from "../../components/atoms/Button";

const themeOptions: AtomKitThemeName[] = ["light", "dark", "corporate", "minimal", "soft", "terminal"];

export interface ThemeSwitcherProps {
  onThemeChange: (theme: AtomKitThemeName) => void;
  value: AtomKitThemeName;
}

export function ThemeSwitcher({ onThemeChange, value }: ThemeSwitcherProps) {
  return (
    <div className="ak-docs-theme-switcher" aria-label="Selecionar tema da documentacao">
      {themeOptions.map((theme) => (
        <Button
          key={theme}
          onClick={() => onThemeChange(theme)}
          size="sm"
          variant={theme === value ? "primary" : "outline"}
        >
          {theme}
        </Button>
      ))}
    </div>
  );
}
