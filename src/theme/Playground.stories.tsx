import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/atoms/Badge";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import { FormField } from "../components/molecules/Field";
import { Card } from "../components/organisms/Card";
import { DataTable, type DataTableColumn } from "../components/organisms/DataTable";
import { AtomKitProvider } from "./AtomKitProvider";
import type { AtomKitDensity, AtomKitThemeName } from "./tokens";

interface PlaygroundRow extends Record<string, unknown> {
  component: string;
  status: "Ready" | "Review";
  type: string;
}

interface PlaygroundArgs {
  density: AtomKitDensity;
  fontFamily: string;
  primaryColor: string;
  radius: string;
  theme: AtomKitThemeName;
}

const rows: PlaygroundRow[] = [
  { component: "Button", status: "Ready", type: "Atom" },
  { component: "FormField", status: "Ready", type: "Molecule" },
  { component: "DataTable", status: "Review", type: "Organism" },
];

const columns: Array<DataTableColumn<PlaygroundRow>> = [
  { key: "component", header: "Component", sortable: true },
  { key: "type", header: "Type" },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge variant={row.status === "Ready" ? "success" : "warning"}>{row.status}</Badge>,
  },
];

function TokenPlayground({ density, fontFamily, primaryColor, radius, theme }: PlaygroundArgs) {
  return (
    <AtomKitProvider
      style={{ minHeight: 560, padding: 24 }}
      theme={theme}
      tokens={{
        colors: {
          primary: primaryColor,
          primaryHover: primaryColor,
        },
        density,
        fontFamily,
        radius,
      }}
    >
      <div style={{ display: "grid", gap: 16 }}>
        <Card
          description="Altere os controles do Storybook para visualizar tokens aplicados em todos os componentes."
          footer={
            <div style={{ display: "flex", gap: 8 }}>
              <Button>Salvar</Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          }
          title="Token Playground"
          variant="elevated"
        >
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Badge variant="info">Theme: {theme}</Badge>
            </div>
            <FormField helperText="O campo usa radius, fonte, cores e densidade do provider." label="Workspace" placeholder="atomkit-ui" />
            <Input helperText="Input atomico com helper text." placeholder="Pesquisar componente" />
          </div>
        </Card>

        <DataTable bordered columns={columns} data={rows} density={density} striped />
      </div>
    </AtomKitProvider>
  );
}

const meta = {
  title: "Themes/Playground",
  component: TokenPlayground,
  tags: ["autodocs"],
  args: {
    density: "comfortable",
    fontFamily: 'Inter, ui-sans-serif, system-ui, "Segoe UI", sans-serif',
    primaryColor: "#2563eb",
    radius: "8px",
    theme: "light",
  },
  argTypes: {
    density: {
      control: "inline-radio",
      options: ["compact", "comfortable"],
    },
    fontFamily: {
      control: "text",
    },
    primaryColor: {
      control: "color",
    },
    radius: {
      control: "text",
    },
    theme: {
      control: "select",
      options: ["light", "dark", "corporate", "minimal", "soft", "terminal"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Playground simples para testar customizacao de tokens: cor primaria, radius, density e fontFamily.",
      },
    },
  },
} satisfies Meta<typeof TokenPlayground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tokens: Story = {};
