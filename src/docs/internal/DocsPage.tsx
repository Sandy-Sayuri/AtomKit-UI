import { useState, type ReactNode } from "react";
import { AtomKitProvider, type AtomKitThemeName } from "../../theme";
import { Badge } from "../../components/atoms/Badge";
import { Card } from "../../components/organisms/Card";
import { AppShell, Container, Header, Section } from "../../components/organisms/layout";
import { ThemeSwitcher } from "./ThemeSwitcher";

export interface DocsPageProps {
  children: ReactNode;
  description: ReactNode;
  eyebrow?: ReactNode;
  status?: "stable" | "beta" | "experimental" | "planned";
  title: ReactNode;
}

const statusVariant = {
  beta: "info",
  experimental: "warning",
  planned: "default",
  stable: "success",
} as const;

export function DocsPage({ children, description, eyebrow = "AtomKit UI Docs", status = "stable", title }: DocsPageProps) {
  const [theme, setTheme] = useState<AtomKitThemeName>("light");

  return (
    <AtomKitProvider className="ak-docs-page" theme={theme}>
      <AppShell
        fullHeight
        header={
          <Header
            actions={<ThemeSwitcher onThemeChange={setTheme} value={theme} />}
            logo={<span className="ak-docs-page__logo">AK</span>}
            title="AtomKit UI Documentation"
          />
        }
      >
        <Container size="xl">
          <Section
            description={description}
            title={
              <span className="ak-docs-page__title">
                <span>{title}</span>
                <Badge size="sm" variant={statusVariant[status]}>
                  {status}
                </Badge>
              </span>
            }
          >
            <Card variant="outlined" padding="16px">
              <div className="ak-docs-page__meta">
                <Badge variant="info">{eyebrow}</Badge>
                <span>Tema atual: {theme}</span>
              </div>
            </Card>
          </Section>
          <div className="ak-docs-page__content">{children}</div>
        </Container>
      </AppShell>
    </AtomKitProvider>
  );
}
