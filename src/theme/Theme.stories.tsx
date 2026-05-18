import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/atoms/Badge";
import { Button } from "../components/atoms/Button";
import { FormField } from "../components/molecules/Field";
import { Card } from "../components/organisms/Card";
import { AtomKitProvider } from "./AtomKitProvider";
import type { AtomKitThemeName } from "./tokens";

const themeNames: AtomKitThemeName[] = ["light", "dark", "corporate", "minimal", "soft", "terminal"];

function ThemePreview({ theme }: { theme: AtomKitThemeName }) {
  return (
    <AtomKitProvider style={{ minHeight: 260, padding: 24 }} theme={theme}>
      <Card description={`Tema ${theme}`} footer={<Button size="sm">Salvar</Button>} title="AtomKit UI">
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            <Badge variant="success">Ativo</Badge>
          </div>
          <FormField helperText="Tokens aplicados via CSS variables." label="Email" placeholder="nome@email.com" />
        </div>
      </Card>
    </AtomKitProvider>
  );
}

const meta = {
  title: "Themes/AtomKitProvider",
  component: AtomKitProvider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Provider responsavel por aplicar temas prontos e overrides parciais de tokens via CSS variables.",
      },
    },
  },
} satisfies Meta<typeof AtomKitProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PresetThemes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      {themeNames.map((theme) => (
        <ThemePreview key={theme} theme={theme} />
      ))}
    </div>
  ),
};

export const PartialOverride: Story = {
  render: () => (
    <AtomKitProvider
      style={{ padding: 24 }}
      theme="light"
      tokens={{
        colors: {
          primary: "#be123c",
          primaryHover: "#9f1239",
          background: "#fff7f8",
          surface: "#ffffff",
        },
        density: "compact",
        radius: "14px",
        shadow: "0 18px 34px rgb(190 18 60 / 16%)",
      }}
    >
      <Card description="Override parcial de tokens por projeto." footer={<Button fullWidth>Aplicar</Button>} title="Tema customizado">
        <FormField helperText="Densidade compacta, radius maior e primary customizado." label="Workspace" placeholder="atomkit" />
      </Card>
    </AtomKitProvider>
  ),
};
