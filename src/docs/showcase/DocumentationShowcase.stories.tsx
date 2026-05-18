import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  FiActivity,
  FiBarChart2,
  FiBox,
  FiCode,
  FiDatabase,
  FiFileText,
  FiGrid,
  FiLayers,
  FiMenu,
  FiNavigation,
  FiSettings,
  FiSliders,
} from "react-icons/fi";
import { Alert } from "../../components/molecules/Alert";
import { Accordion } from "../../components/molecules/Accordion";
import { FormField } from "../../components/molecules/Field";
import { Tooltip } from "../../components/molecules/Tooltip";
import { Badge } from "../../components/atoms/Badge";
import { Button } from "../../components/atoms/Button";
import { IconButton } from "../../components/atoms/IconButton";
import { Card } from "../../components/organisms/Card";
import { DataTable, type DataTableColumn } from "../../components/organisms/DataTable";
import { StatsCard } from "../../components/organisms/StatsCard";
import { AppShell } from "../../components/organisms/layout/AppShell";
import { Container } from "../../components/organisms/layout/Container";
import { Footer } from "../../components/organisms/layout/Footer";
import { Header } from "../../components/organisms/layout/Header";
import { Section } from "../../components/organisms/layout/Section";
import { Sidebar } from "../../components/organisms/layout/Sidebar";
import type { MenuItemData } from "../../components/organisms/navigation";
import { DonutChart, LineChart } from "../../charts";
import { salesData, themeShareData } from "../../mocks/charts";
import { AtomKitProvider, themes, type AtomKitThemeName } from "../../theme";

type ComponentStatus = "stable" | "beta" | "experimental" | "planned";

interface ComponentRow extends Record<string, unknown> {
  category: string;
  name: string;
  status: ComponentStatus;
}

const themeNames: AtomKitThemeName[] = ["light", "dark", "corporate", "minimal", "soft", "terminal"];

const componentRows: ComponentRow[] = [
  { category: "Layout", name: "AppShell", status: "beta" },
  { category: "Layout", name: "Header", status: "stable" },
  { category: "Layout", name: "Sidebar", status: "stable" },
  { category: "Navigation", name: "Menu", status: "beta" },
  { category: "Components", name: "Button", status: "stable" },
  { category: "Forms", name: "FormField", status: "stable" },
  { category: "Data Display", name: "DataTable", status: "beta" },
  { category: "Charts", name: "LineChart", status: "experimental" },
  { category: "Charts", name: "DonutChart", status: "experimental" },
];

const statusVariant: Record<ComponentStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  beta: "info",
  experimental: "warning",
  planned: "default",
  stable: "success",
};

const menuItems: Array<MenuItemData> = [
  { icon: <FiFileText />, label: "Getting Started" },
  { icon: <FiSliders />, label: "Theme System" },
  { icon: <FiBox />, label: "Components" },
  { icon: <FiCode />, label: "Forms" },
  { icon: <FiDatabase />, label: "Data Display" },
  { icon: <FiBarChart2 />, label: "Charts" },
  { icon: <FiGrid />, label: "Layout" },
  { icon: <FiNavigation />, label: "Navigation" },
];

const columns: Array<DataTableColumn<ComponentRow>> = [
  { key: "name", header: "Component", sortable: true },
  { key: "category", header: "Category", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    sortable: true,
  },
];

function TokenPreview({ themeName }: { themeName: AtomKitThemeName }) {
  const theme = themes[themeName];
  const colorEntries = Object.entries(theme.colors).slice(0, 10);

  return (
    <Card description="Tokens aplicados na propria documentacao." icon={<FiSliders />} title="Current Theme Tokens" variant="outlined">
      <div className="ak-showcase-token-grid">
        {colorEntries.map(([name, value]) => (
          <div className="ak-showcase-token" key={name}>
            <span className="ak-showcase-swatch" style={{ background: value }} />
            <span>{name}</span>
            <code>{value}</code>
          </div>
        ))}
      </div>
      <div className="ak-showcase-token-meta">
        <Badge>radius: {theme.radius}</Badge>
        <Badge>spacing: {theme.spacing}</Badge>
        <Badge>density: {theme.density}</Badge>
        <Badge>shadow: {theme.shadow === "none" ? "none" : "enabled"}</Badge>
        <Badge>typography: {theme.fontFamily.split(",")[0]}</Badge>
      </div>
    </Card>
  );
}

function ThemeSwitcher({
  themeName,
  onThemeChange,
}: {
  onThemeChange: (theme: AtomKitThemeName) => void;
  themeName: AtomKitThemeName;
}) {
  return (
    <div className="ak-showcase-theme-switcher">
      {themeNames.map((name) => (
        <Button key={name} onClick={() => onThemeChange(name)} size="sm" variant={name === themeName ? "primary" : "outline"}>
          {name}
        </Button>
      ))}
    </div>
  );
}

function ComponentExamples() {
  return (
    <div className="ak-showcase-grid">
      <Card actions={<IconButton icon={<FiMenu />} label="More" />} description="Composicao com actions." icon={<FiBox />} title="Button + Card">
        <div className="ak-showcase-inline">
          <Button iconLeft={<FiSettings />}>Configure</Button>
          <Button iconRight={<FiActivity />} variant="outline">
            Inspect
          </Button>
        </div>
      </Card>
      <Card description="Forms usam tokens e icones." icon={<FiCode />} title="Form">
        <FormField helperText="Campo demonstrativo." label="Workspace" labelIcon={<FiLayers />} placeholder="atomkit-ui" />
      </Card>
      <Card description="Estados informativos e conteudo expansivel." icon={<FiFileText />} title="Feedback">
        <div className="ak-showcase-stack">
          <Alert icon={<FiActivity />} title="Token-driven" variant="info">
            A documentacao muda visualmente com o tema selecionado.
          </Alert>
          <Accordion
            items={[
              {
                content: "Accordion real da biblioteca usado dentro do showcase.",
                icon: <FiLayers />,
                id: "composition",
                title: "Composition",
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

function SystemPreview() {
  const previewRows = [
    { id: "1", owner: "Design", status: "stable", usage: "High" },
    { id: "2", owner: "Frontend", status: "beta", usage: "Medium" },
    { id: "3", owner: "Docs", status: "experimental", usage: "Low" },
  ];

  return (
    <div className="ak-showcase-system">
      <div className="ak-showcase-grid">
        <StatsCard icon={<FiBox />} label="Components" trend="+12%" value="38" />
        <StatsCard icon={<FiSliders />} label="Themes" trend="6 presets" value="6" />
        <StatsCard icon={<FiBarChart2 />} label="Charts" trend="SVG" value="5" />
      </div>
      <div className="ak-showcase-grid ak-showcase-grid--wide">
        <Card description="SVG chart component." icon={<FiBarChart2 />} title="Usage">
          <LineChart data={salesData} height={180} showGrid showTooltip xKey="month" yKey="value" />
        </Card>
        <Card description="Theme adoption." icon={<FiActivity />} title="Theme Share">
          <DonutChart data={themeShareData} height={220} labelKey="theme" showLegend valueKey="value" />
        </Card>
      </div>
      <Card description="DataTable real com badges." icon={<FiDatabase />} title="Component Health">
        <DataTable
          bordered
          columns={[
            { key: "owner", header: "Owner", sortable: true },
            { key: "usage", header: "Usage" },
            {
              key: "status",
              header: "Status",
              render: (row) => <Badge variant={statusVariant[row.status as ComponentStatus]}>{String(row.status)}</Badge>,
            },
          ]}
          data={previewRows}
          density="compact"
          striped
        />
      </Card>
    </div>
  );
}

function DocumentationApp() {
  const [themeName, setThemeName] = useState<AtomKitThemeName>("light");
  const activeTheme = useMemo(() => themes[themeName], [themeName]);

  return (
    <AtomKitProvider theme={themeName}>
      <AppShell
        fullHeight
        layout="dashboard"
        header={
          <Header
            actions={
              <>
                <Tooltip content="Troque o tema para ver a UI reagindo" icon={<FiSliders />}>
                  Themes
                </Tooltip>
                <Button iconLeft={<FiSettings />} size="sm" variant="outline">
                  Settings
                </Button>
              </>
            }
            logo={<Badge variant="info">AK</Badge>}
            title="AtomKit UI Docs"
          />
        }
        sidebar={
          <Sidebar
            footer={<Badge>{activeTheme.density}</Badge>}
            items={menuItems}
            profileSlot={
              <div>
                <strong>Documentation</strong>
                <p className="ak-showcase-muted">Built with AtomKit UI</p>
              </div>
            }
          />
        }
        footer={<Footer content="AtomKit UI showcase built with AtomKit UI components." variant="muted" />}
      >
        <Container size="full">
          <Section
            actions={<ThemeSwitcher onThemeChange={setThemeName} themeName={themeName} />}
            description="A living documentation app that uses the same components it documents."
            title="Documentation Showcase"
          >
            <Alert icon={<FiActivity />} title="Real composition" variant="success">
              This page is assembled with AppShell, Header, Sidebar, Menu, Button, Card, Badge, Tooltip, Accordion,
              DataTable, charts and theme tokens from AtomKit UI.
            </Alert>
            <TokenPreview themeName={themeName} />
            <ComponentExamples />
            <Card description="Only existing components are listed as ready. Planned is reserved for future items." icon={<FiDatabase />} title="Component Status">
              <DataTable bordered columns={columns} data={componentRows} density="comfortable" striped />
            </Card>
          </Section>
        </Container>
      </AppShell>
    </AtomKitProvider>
  );
}

function SystemPreviewApp() {
  const [themeName, setThemeName] = useState<AtomKitThemeName>("corporate");

  return (
    <AtomKitProvider theme={themeName}>
      <AppShell
        fullHeight
        layout="dashboard"
        header={
          <Header
            actions={<ThemeSwitcher onThemeChange={setThemeName} themeName={themeName} />}
            logo={<Badge>AtomKit</Badge>}
            title="System Preview"
          />
        }
        sidebar={<Sidebar footer="System Preview" items={menuItems} profileSlot={<strong>Product Team</strong>} />}
      >
        <Container size="full">
          <Section description="A fictitious product screen composed with AtomKit UI." title="Dashboard">
            <SystemPreview />
          </Section>
        </Container>
      </AppShell>
    </AtomKitProvider>
  );
}

const meta = {
  title: "Showcase/Documentation App",
  component: DocumentationApp,
  tags: ["autodocs"],
} satisfies Meta<typeof DocumentationApp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Documentation: Story = {
  render: () => <DocumentationApp />,
};

export const SystemPreviewStory: Story = {
  name: "System Preview",
  render: () => <SystemPreviewApp />,
};
