import { useMemo, useState } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiBox,
  FiCode,
  FiDatabase,
  FiFileText,
  FiGrid,
  FiLayers,
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
} from "../../src";
import { salesData, themeShareData } from "../../src/mocks/charts";

type ComponentStatus = "stable" | "beta" | "experimental";
type SectionId = "overview" | "themes" | "components" | "charts" | "data" | "used";

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

const statusVariant: Record<ComponentStatus, "success" | "warning" | "info"> = {
  beta: "info",
  experimental: "warning",
  stable: "success",
};

const componentRows: ComponentRow[] = [
  { category: "Layout", name: "AppShell", status: "beta" },
  { category: "Layout", name: "Header", status: "stable" },
  { category: "Layout", name: "Sidebar", status: "stable" },
  { category: "Navigation", name: "NavigationTree", status: "beta" },
  { category: "Atoms", name: "Button", status: "stable" },
  { category: "Atoms", name: "Badge", status: "stable" },
  { category: "Atoms", name: "Input", status: "stable" },
  { category: "Molecules", name: "FormField", status: "stable" },
  { category: "Molecules", name: "Accordion", status: "stable" },
  { category: "Molecules", name: "Tooltip", status: "stable" },
  { category: "Organisms", name: "Card", status: "stable" },
  { category: "Organisms", name: "DataTable", status: "beta" },
  { category: "Charts", name: "LineChart", status: "experimental" },
  { category: "Charts", name: "BarChart", status: "experimental" },
  { category: "Charts", name: "DonutChart", status: "experimental" },
  { category: "Charts", name: "Sparkline", status: "experimental" },
];

const usedRows: UsedComponentRow[] = [
  { component: "AtomKitProvider", role: "Aplica o tema real em todo o app de documentacao." },
  { component: "AppShell", role: "Estrutura header, sidebar, conteudo e footer." },
  { component: "Header", role: "Topo fixo da documentacao." },
  { component: "Sidebar", role: "Regiao lateral da aplicacao." },
  { component: "NavigationTree", role: "Menu lateral hierarquico." },
  { component: "Card", role: "Blocos principais de conteudo." },
  { component: "Button", role: "Acoes e seletor de tema." },
  { component: "Badge", role: "Status, labels e metadados." },
  { component: "Tooltip", role: "Ajuda contextual no header." },
  { component: "Accordion", role: "Conteudo progressivo." },
  { component: "DataTable", role: "Tabelas de componentes e inventario." },
  { component: "FormField", role: "Campo rotulado de exemplo." },
  { component: "Input", role: "Input atomico isolado." },
  { component: "Charts", role: "LineChart, BarChart, DonutChart e Sparkline." },
];

const componentColumns: Array<DataTableColumn<ComponentRow>> = [
  { key: "name", header: "Component", sortable: true },
  { key: "category", header: "Category", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    sortable: true,
  },
];

const usedColumns: Array<DataTableColumn<UsedComponentRow>> = [
  { key: "component", header: "Component", render: (row) => <Badge variant="info">{row.component}</Badge> },
  { key: "role", header: "Used for" },
];

function createNavigationGroups(onSelect: (section: SectionId) => void): NavigationTreeGroup[] {
  return [
    {
      defaultOpen: true,
      icon: <FiFileText />,
      id: "docs",
      items: [
        { icon: <FiFileText />, id: "overview", label: "Overview", onClick: () => onSelect("overview") },
        { icon: <FiSliders />, id: "themes", label: "Themes", badge: <Badge size="sm">6</Badge>, onClick: () => onSelect("themes") },
        { icon: <FiBox />, id: "components", label: "Components", onClick: () => onSelect("components") },
        { icon: <FiBarChart2 />, id: "charts", label: "Charts", onClick: () => onSelect("charts") },
      ],
      label: "Documentation",
    },
    {
      defaultOpen: true,
      icon: <FiNavigation />,
      id: "library",
      items: [
        { icon: <FiDatabase />, id: "data", label: "Data Display", onClick: () => onSelect("data") },
        { icon: <FiActivity />, id: "used", label: "Used on this page", onClick: () => onSelect("used") },
      ],
      label: "Reference",
    },
  ];
}

function ThemeSwitcher({
  className = "",
  onThemeChange,
  value,
}: {
  className?: string;
  onThemeChange: (theme: AtomKitThemeName) => void;
  value: AtomKitThemeName;
}) {
  return (
    <div className={["docs-actions", className].filter(Boolean).join(" ")} aria-label="Selecionar tema">
      {themeNames.map((theme) => (
        <Button key={theme} onClick={() => onThemeChange(theme)} size="sm" variant={theme === value ? "primary" : "outline"}>
          {theme}
        </Button>
      ))}
    </div>
  );
}

export function DocumentationApp() {
  const [themeName, setThemeName] = useState<AtomKitThemeName>("corporate");
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const activeTheme = useMemo(() => themes[themeName], [themeName]);
  const tokenEntries = Object.entries(activeTheme.colors).slice(0, 6);
  const navigationGroups = useMemo(() => createNavigationGroups((section) => {
    setActiveSection(section);
    if (section === "themes") {
      setThemePanelOpen(true);
    }
  }), []);

  return (
    <AtomKitProvider theme={themeName}>
      <AppShell
        fullHeight
        layout="dashboard"
        header={
          <Header
            actions={
              <div className="docs-header-actions">
                <div className="docs-theme-menu">
                  <Tooltip content="Troque o tema aplicado pelo AtomKitProvider">
                    <Button
                      iconLeft={<FiSliders />}
                      onClick={() => {
                        setActiveSection("themes");
                        setThemePanelOpen((open) => !open);
                      }}
                      size="sm"
                      variant={themePanelOpen ? "primary" : "outline"}
                    >
                      Theme
                    </Button>
                  </Tooltip>
                  {themePanelOpen ? (
                    <Card className="docs-theme-popover" padding="12px" variant="outlined">
                      <ThemeSwitcher
                        className="docs-actions--theme-panel"
                        onThemeChange={(theme) => {
                          setThemeName(theme);
                          setActiveSection("themes");
                        }}
                        value={themeName}
                      />
                    </Card>
                  ) : null}
                </div>
                <Button iconLeft={<FiSettings />} size="sm" variant="outline">
                  Settings
                </Button>
              </div>
            }
            logo={<Badge variant="info">AK</Badge>}
            title="AtomKit UI"
          />
        }
        sidebar={
          <Sidebar
            footer={<Badge>{activeTheme.density}</Badge>}
            profileSlot={
              <div>
                <strong>AtomKit Docs</strong>
                <p className="docs-muted">Standalone documentation</p>
              </div>
            }
            width={292}
          >
            <NavigationTree
              activeId={activeSection}
              compact
              footer={<Badge variant="success">React + TypeScript</Badge>}
              groups={navigationGroups}
              searchable
              title="Docs"
              width="100%"
            />
          </Sidebar>
        }
        footer={<Footer content="AtomKit UI documentation app built with AtomKit UI components." variant="muted" />}
      >
        <Container size="xl">
          <Section
            description="Documentacao propria, fora do Storybook, renderizada com os componentes exportados pela AtomKit UI."
            title="Documentation App"
          >
            <Card
              actions={<Badge variant="success">No Storybook runtime</Badge>}
              className="docs-hero"
              description="Uma vitrine real da biblioteca: layout, navegacao, tabelas, forms e graficos saem da propria AtomKit UI."
              icon={<FiLayers />}
              title="Build interfaces with tokens, themes and reusable React components."
            >
              <div className="docs-hero__content">
                <Alert icon={<FiActivity />} title="Tema real aplicado" variant="info">
                  O seletor acima troca o tema do AtomKitProvider e todos os componentes respondem aos mesmos tokens.
                </Alert>
                <div className="docs-kpis">
                  <StatsCard icon={<FiBox />} label="Components" trend="Atoms to charts" value="16" />
                  <StatsCard icon={<FiSliders />} label="Themes" trend={themeName} value="6" />
                  <StatsCard icon={<FiBarChart2 />} label="Charts" trend="SVG native" value="4" />
                </div>
              </div>
            </Card>

            <div className="docs-grid docs-grid--three">
              <Card description="Controles reais usados no proprio site." icon={<FiCode />} title="Forms">
                <div className="docs-stack">
                  <FormField helperText="Campo demonstrativo usando FormField." label="Workspace" labelIcon={<FiLayers />} placeholder="atomkit-ui" />
                  <Input iconLeft={<FiCode />} placeholder="Input atomico real" />
                  <div className="docs-inline">
                    <Button size="sm">Save</Button>
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                  </div>
                </div>
              </Card>

              <Card description="Tokens do tema atual sem CSS fixo nos componentes." icon={<FiSliders />} title="Theme tokens">
                <div className="docs-token-grid">
                  {tokenEntries.map(([name, value]) => (
                    <div className="docs-token" key={name}>
                      <span className="docs-swatch" style={{ background: value }} />
                      <span>{name}</span>
                      <code>{value}</code>
                    </div>
                  ))}
                </div>
              </Card>

              <Card description="Conteudo progressivo com Accordion real." icon={<FiFileText />} title="Guidance">
                <Accordion
                  items={[
                    {
                      content: "Use componentes da biblioteca antes de criar estilos locais. CSS aqui fica restrito ao layout do app.",
                      icon: <FiLayers />,
                      id: "composition",
                      title: "Composition",
                    },
                    {
                      content: "Charts continuam em SVG autoral, sem Recharts, Chart.js ou ApexCharts.",
                      icon: <FiBarChart2 />,
                      id: "charts",
                      title: "Charts",
                    },
                  ]}
                />
              </Card>
            </div>

            <div className="docs-grid docs-grid--charts">
              <Card description="LineChart SVG autoral com tooltip e grid." icon={<FiBarChart2 />} title="Usage trend">
                <LineChart data={salesData} height={220} showGrid showTooltip xKey="month" yKey="value" />
              </Card>
              <Card description="Visualizacoes compactas para documentacao." icon={<FiActivity />} title="Signals">
                <div className="docs-chart-stack">
                  <BarChart data={salesData.slice(0, 5)} height={140} showTooltip xKey="month" yKey="value" />
                  <Sparkline data={salesData} height={58} showTooltip xKey="month" yKey="value" />
                  <DonutChart data={themeShareData} height={190} labelKey="theme" showLegend valueKey="value" />
                </div>
              </Card>
            </div>

            <Card description="Componentes usados como documentacao viva." icon={<FiDatabase />} title="Component status">
              <DataTable bordered columns={componentColumns} data={componentRows} density="compact" striped />
            </Card>

            <Card description="Inventario dos componentes reais usados nesta pagina." icon={<FiGrid />} title="Components used on this page">
              <DataTable bordered columns={usedColumns} data={usedRows} density="compact" striped />
            </Card>
          </Section>
        </Container>
      </AppShell>
    </AtomKitProvider>
  );
}
