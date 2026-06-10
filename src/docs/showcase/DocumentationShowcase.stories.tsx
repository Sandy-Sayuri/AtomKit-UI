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
import {
  Accordion,
  Alert,
  AppShell,
  AtomKitProvider,
  Badge,
  BarChart,
  Button,
  Card,
  Container,
  DataTable,
  DonutChart,
  Footer,
  FormField,
  Header,
  IconButton,
  Input,
  LineChart,
  NavigationTree,
  Section,
  Sidebar,
  Sparkline,
  StatsCard,
  Tooltip,
  themes,
  type AtomKitThemeName,
  type DataTableColumn,
  type NavigationTreeGroup,
} from "../../index";
import { salesData, themeShareData } from "../../mocks/charts";

type ComponentStatus = "stable" | "beta" | "experimental" | "planned";

interface ComponentRow extends Record<string, unknown> {
  category: string;
  name: string;
  status: ComponentStatus;
}

interface UsedComponentRow extends Record<string, unknown> {
  component: string;
  role: string;
}

const themeNames: AtomKitThemeName[] = ["light", "dark", "corporate", "minimal", "soft", "terminal"];

const componentRows: ComponentRow[] = [
  { category: "Layout", name: "AppShell", status: "beta" },
  { category: "Layout", name: "Header", status: "stable" },
  { category: "Layout", name: "Sidebar", status: "stable" },
  { category: "Navigation", name: "NavigationTree", status: "beta" },
  { category: "Components", name: "Button", status: "stable" },
  { category: "Forms", name: "FormField", status: "stable" },
  { category: "Forms", name: "Input", status: "stable" },
  { category: "Data Display", name: "DataTable", status: "beta" },
  { category: "Charts", name: "LineChart", status: "experimental" },
  { category: "Charts", name: "BarChart", status: "experimental" },
  { category: "Charts", name: "Sparkline", status: "experimental" },
  { category: "Charts", name: "DonutChart", status: "experimental" },
];

const statusVariant: Record<ComponentStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  beta: "info",
  experimental: "warning",
  planned: "default",
  stable: "success",
};

const navigationGroups: NavigationTreeGroup[] = [
  {
    defaultOpen: true,
    icon: <FiFileText />,
    id: "docs",
    items: [
      { icon: <FiFileText />, id: "getting-started", label: "Getting Started" },
      { icon: <FiSliders />, id: "theme-system", label: "Theme System", badge: <Badge size="sm">6</Badge> },
      { icon: <FiDatabase />, id: "component-status", label: "Component Status" },
      { icon: <FiGrid />, id: "used-components", label: "Components used" },
    ],
    label: "Documentation",
  },
  {
    defaultOpen: true,
    icon: <FiBox />,
    id: "library",
    items: [
      { icon: <FiBox />, id: "components", label: "Components" },
      { icon: <FiCode />, id: "forms", label: "Forms" },
      { icon: <FiBarChart2 />, id: "charts", label: "Charts" },
      { icon: <FiNavigation />, id: "navigation", label: "Navigation" },
    ],
    label: "Library",
  },
];

const usedComponentRows: UsedComponentRow[] = [
  { component: "AtomKitProvider", role: "Applies the selected real theme to the full documentation app." },
  { component: "AppShell", role: "Owns the application frame with header, sidebar, content and footer." },
  { component: "Header", role: "Renders the top documentation bar and actions." },
  { component: "Sidebar", role: "Provides the lateral documentation area." },
  { component: "NavigationTree", role: "Renders the real documentation navigation menu." },
  { component: "Card", role: "Frames every documentation content block." },
  { component: "Button", role: "Renders actions and the theme selector controls." },
  { component: "Badge", role: "Shows status, density and metadata labels." },
  { component: "Tooltip", role: "Documents contextual helper content in the header." },
  { component: "Accordion", role: "Shows expandable documentation content." },
  { component: "DataTable", role: "Renders component status and this usage inventory." },
  { component: "FormField", role: "Renders labeled example fields." },
  { component: "Input", role: "Renders standalone input examples." },
  { component: "LineChart, BarChart, DonutChart, Sparkline", role: "Render SVG chart examples from the library." },
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
        <div className="ak-showcase-stack">
          <FormField helperText="Campo demonstrativo." label="Workspace" labelIcon={<FiLayers />} placeholder="atomkit-ui" />
          <Input iconLeft={<FiCode />} placeholder="Standalone Input real" />
        </div>
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

function ChartExamples() {
  return (
    <div className="ak-showcase-grid ak-showcase-grid--wide">
      <Card description="LineChart real com tooltip ancorado ao ponto." icon={<FiBarChart2 />} title="Trend">
        <LineChart data={salesData} height={180} showGrid showTooltip xKey="month" yKey="value" />
      </Card>
      <Card description="BarChart e Sparkline reais usando os mesmos tokens." icon={<FiActivity />} title="Signals">
        <div className="ak-showcase-stack">
          <BarChart data={salesData.slice(0, 5)} height={150} showTooltip xKey="month" yKey="value" />
          <Sparkline data={salesData} height={64} showTooltip xKey="month" yKey="value" />
        </div>
      </Card>
    </div>
  );
}

function ComponentsUsedOnThisPage() {
  const usedColumns: Array<DataTableColumn<UsedComponentRow>> = [
    { key: "component", header: "Component", render: (row) => <Badge variant="info">{row.component}</Badge> },
    { key: "role", header: "Used for" },
  ];

  return (
    <Card
      description="Inventory of the exported AtomKit UI components rendering this documentation page."
      icon={<FiGrid />}
      title="Components used on this page"
    >
      <DataTable bordered columns={usedColumns} data={usedComponentRows} density="compact" striped />
    </Card>
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
            profileSlot={
              <div>
                <strong>Documentation</strong>
                <p className="ak-showcase-muted">Built with AtomKit UI</p>
              </div>
            }
            width={300}
          >
            <NavigationTree
              activeId="getting-started"
              compact
              footer={<Badge variant="success">AtomKit UI</Badge>}
              groups={navigationGroups}
              searchable
              title="Docs navigation"
              width="100%"
            />
          </Sidebar>
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
              This page is assembled with AppShell, Header, Sidebar, NavigationTree, Button, Card, Badge, Tooltip,
              Accordion, DataTable, charts and theme tokens from AtomKit UI.
            </Alert>
            <TokenPreview themeName={themeName} />
            <ComponentExamples />
            <ChartExamples />
            <Card description="Only existing components are listed as ready. Planned is reserved for future items." icon={<FiDatabase />} title="Component Status">
              <DataTable bordered columns={columns} data={componentRows} density="comfortable" striped />
            </Card>
            <ComponentsUsedOnThisPage />
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
        sidebar={
          <Sidebar footer="System Preview" profileSlot={<strong>Product Team</strong>}>
            <NavigationTree activeId="components" compact groups={navigationGroups} title="Product" width="100%" />
          </Sidebar>
        }
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
  parameters: {
    docs: {
      disable: true,
    },
    layout: "fullscreen",
  },
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
