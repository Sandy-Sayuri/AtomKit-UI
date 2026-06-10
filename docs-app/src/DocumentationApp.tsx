import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBox,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiPlus,
  FiSearch,
  FiSend,
  FiSettings,
  FiShoppingBag,
  FiSliders,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import {
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
  Select,
  Sidebar,
  Sparkline,
  StatsCard,
  Tooltip,
  type AtomKitDensity,
  type AtomKitThemeName,
  type DataTableColumn,
  type NavigationTreeGroup,
} from "../../src";
import { salesData, sparklineData, themeShareData } from "../../src/mocks/charts";

type DemoSectionId = "dashboard" | "customers" | "orders" | "reports" | "settings";
type DemoFontScale = "normal" | "large" | "extra";
type CustomerStatus = "Ativo" | "Analise" | "Bloqueado";
type OrderStatus = "Pago" | "Pendente" | "Cancelado";

interface CustomerRow extends Record<string, unknown> {
  company: string;
  email: string;
  id: string;
  name: string;
  owner: string;
  status: CustomerStatus;
}

interface OrderRow extends Record<string, unknown> {
  amount: string;
  customer: string;
  id: string;
  status: OrderStatus;
  updatedAt: string;
}

interface ReportRow extends Record<string, unknown> {
  area: string;
  current: string;
  previous: string;
  trend: string;
}

const themeNames: AtomKitThemeName[] = ["light", "dark", "corporate", "minimal", "soft", "terminal"];

const fontScaleOptions: Array<{ label: string; value: DemoFontScale }> = [
  { label: "Normal", value: "normal" },
  { label: "Grande", value: "large" },
  { label: "Extra grande", value: "extra" },
];

const fontFamilyOptions = [
  { label: "Inter / Sistema", value: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { label: "Segoe UI", value: '"Segoe UI", Arial, sans-serif' },
  { label: "Monoespacada", value: '"Cascadia Code", "Fira Code", Consolas, monospace' },
];

function createPrimaryHover(hexColor: string) {
  const normalized = hexColor.replace("#", "");
  if (normalized.length !== 6) {
    return hexColor;
  }

  const channels = normalized.match(/.{2}/g);
  if (!channels) {
    return hexColor;
  }

  const darker = channels
    .map((channel) => Math.max(0, Math.round(Number.parseInt(channel, 16) * 0.82)).toString(16).padStart(2, "0"))
    .join("");

  return `#${darker}`;
}

const companyOptions = [
  { label: "Martins Foods", value: "Martins Foods" },
  { label: "Costa Retail", value: "Costa Retail" },
  { label: "Lima Market", value: "Lima Market" },
  { label: "Alves Supply", value: "Alves Supply" },
  { label: "Rocha Labs", value: "Rocha Labs" },
];

const customers: CustomerRow[] = [
  { company: "Martins Foods", email: "ana@martinsfoods.com", id: "C-2401", name: "Ana Martins", owner: "Julia", status: "Ativo" },
  { company: "Costa Retail", email: "bruno@costaretail.com", id: "C-2402", name: "Bruno Costa", owner: "Rafael", status: "Analise" },
  { company: "Lima Market", email: "clara@limamarket.com", id: "C-2403", name: "Clara Lima", owner: "Julia", status: "Ativo" },
  { company: "Alves Supply", email: "diego@alvessupply.com", id: "C-2404", name: "Diego Alves", owner: "Marina", status: "Bloqueado" },
  { company: "Rocha Labs", email: "eva@rochalabs.com", id: "C-2405", name: "Eva Rocha", owner: "Rafael", status: "Ativo" },
];

const initialOrders: OrderRow[] = [
  { amount: "R$ 1.240,00", customer: "Ana Martins", id: "#1024", status: "Pago", updatedAt: "Hoje, 09:32" },
  { amount: "R$ 890,00", customer: "Bruno Costa", id: "#1023", status: "Pendente", updatedAt: "Hoje, 08:14" },
  { amount: "R$ 2.310,00", customer: "Clara Lima", id: "#1022", status: "Pago", updatedAt: "Ontem, 17:45" },
  { amount: "R$ 410,00", customer: "Diego Alves", id: "#1021", status: "Cancelado", updatedAt: "Ontem, 11:20" },
  { amount: "R$ 1.760,00", customer: "Eva Rocha", id: "#1020", status: "Pago", updatedAt: "Seg, 15:08" },
];

const customerStatusVariant: Record<CustomerStatus, "danger" | "success" | "warning"> = {
  Ativo: "success",
  Analise: "warning",
  Bloqueado: "danger",
};

const statusVariant: Record<OrderStatus, "danger" | "success" | "warning"> = {
  Cancelado: "danger",
  Pago: "success",
  Pendente: "warning",
};

const customerColumns: Array<DataTableColumn<CustomerRow>> = [
  { key: "id", header: "Codigo", sortable: true },
  { key: "name", header: "Cliente", sortable: true },
  { key: "company", header: "Empresa", sortable: true },
  { key: "email", header: "Email" },
  { key: "owner", header: "Responsavel", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge variant={customerStatusVariant[row.status]}>{row.status}</Badge>,
    sortable: true,
  },
];

const orderColumns: Array<DataTableColumn<OrderRow>> = [
  { key: "id", header: "Pedido", sortable: true },
  { key: "customer", header: "Cliente", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    sortable: true,
  },
  { align: "right", key: "amount", header: "Valor", sortable: true },
  { key: "updatedAt", header: "Atualizado" },
];

const reportRows: ReportRow[] = [
  { area: "Receita", current: "R$ 42.8k", previous: "R$ 36.2k", trend: "+18%" },
  { area: "Pedidos", current: "186", previous: "154", trend: "+21%" },
  { area: "Clientes ativos", current: "1.248", previous: "1.145", trend: "+9%" },
  { area: "Conversao", current: "3.8%", previous: "3.4%", trend: "+0.4pp" },
];

const reportColumns: Array<DataTableColumn<ReportRow>> = [
  { key: "area", header: "Indicador", sortable: true },
  { key: "current", header: "Atual", sortable: true },
  { key: "previous", header: "Anterior" },
  { key: "trend", header: "Variacao", render: (row) => <Badge variant="success">{row.trend}</Badge> },
];

const screenCopy: Record<DemoSectionId, { description: string; title: string }> = {
  customers: {
    description: "Gerencie carteiras, responsaveis, status de analise e novos cadastros.",
    title: "Clientes",
  },
  dashboard: {
    description: "Acompanhe receita, pedidos, clientes e conversao em tempo real.",
    title: "Painel comercial",
  },
  orders: {
    description: "Controle pedidos recentes, cobrancas pendentes e atualizacoes financeiras.",
    title: "Pedidos",
  },
  reports: {
    description: "Analise desempenho comercial, distribuicao de receita e sinais de crescimento.",
    title: "Relatorios",
  },
  settings: {
    description: "Configure aparencia, dados da empresa e parametros operacionais do painel.",
    title: "Configuracoes",
  },
};

function createNavigationGroups(onSelect: (section: DemoSectionId) => void): NavigationTreeGroup[] {
  return [
    {
      defaultOpen: true,
      icon: <FiHome />,
      id: "workspace",
      items: [
        { icon: <FiGrid />, id: "dashboard", label: "Dashboard", onClick: () => onSelect("dashboard") },
        { icon: <FiUsers />, id: "customers", label: "Clientes", badge: <Badge size="sm">24</Badge>, onClick: () => onSelect("customers") },
        { icon: <FiShoppingBag />, id: "orders", label: "Pedidos", onClick: () => onSelect("orders") },
        { icon: <FiBarChart2 />, id: "reports", label: "Relatorios", onClick: () => onSelect("reports") },
      ],
      label: "Demo App",
    },
    {
      defaultOpen: true,
      icon: <FiSettings />,
      id: "admin",
      items: [{ icon: <FiSliders />, id: "settings", label: "Configuracoes", onClick: () => onSelect("settings") }],
      label: "Admin",
    },
  ];
}

function ThemeSwitcher({
  onThemeChange,
  value,
}: {
  onThemeChange: (theme: AtomKitThemeName) => void;
  value: AtomKitThemeName;
}) {
  return (
    <div className="demo-theme-switcher" aria-label="Selecionar tema">
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
  const [density, setDensity] = useState<AtomKitDensity>("comfortable");
  const [fontScale, setFontScale] = useState<DemoFontScale>("normal");
  const [panelFontFamily, setPanelFontFamily] = useState(fontFamilyOptions[0].value);
  const [primaryColor, setPrimaryColor] = useState("#174ea6");
  const [brandName, setBrandName] = useState("AtomKit Commerce");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<DemoSectionId>("dashboard");
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState<OrderRow[]>([]);
  const [clientForm, setClientForm] = useState({
    company: "",
    email: "",
    name: "",
  });
  const [createdClientName, setCreatedClientName] = useState<string | null>(null);
  const [orderNotice, setOrderNotice] = useState<{ body: string; title: string } | null>(null);
  const navigationGroups = useMemo(() => createNavigationGroups(setActiveSection), []);

  function handleClientSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fallbackName = clientForm.name.trim() || "Novo cliente";
    setCreatedClientName(fallbackName);
    setClientForm({ company: "", email: "", name: "" });
  }

  function showSelectionRequired() {
    setOrderNotice({
      body: "Selecione um ou mais pedidos na tabela para executar esta operacao.",
      title: "Nenhum pedido selecionado",
    });
  }

  function handleGenerateCharge() {
    if (selectedOrders.length === 0) {
      showSelectionRequired();
      return;
    }

    const orderList = selectedOrders.map((order) => order.id).join(", ");
    setOrderNotice({
      body: `Cobranca gerada para ${selectedOrders.length} pedido(s): ${orderList}. A equipe financeira ja pode acompanhar o envio.`,
      title: "Cobranca enviada para processamento",
    });
  }

  function handleMarkPaid() {
    if (selectedOrders.length === 0) {
      showSelectionRequired();
      return;
    }

    const selectedIds = new Set(selectedOrders.map((order) => order.id));
    setOrders((current) =>
      current.map((order) => (selectedIds.has(order.id) ? { ...order, status: "Pago", updatedAt: "Agora" } : order)),
    );
    setOrderNotice({
      body: `${selectedOrders.length} pedido(s) foram marcados como pagos e atualizados na tabela.`,
      title: "Status atualizado",
    });
  }

  function handleOpenOrder(order: OrderRow) {
    setOrderNotice({
      body: `${order.id} de ${order.customer}, no valor de ${order.amount}, esta com status ${order.status}.`,
      title: "Resumo do pedido",
    });
  }

  function handleOpenCustomer(customer: CustomerRow) {
    setOrderNotice({
      body: `${customer.name} esta vinculado a ${customer.company}, com atendimento de ${customer.owner} e status ${customer.status}.`,
      title: "Resumo do cliente",
    });
  }

  function handleExportReport() {
    setOrderNotice({
      body: "O relatorio comercial foi enviado para a fila de exportacao. Quando estiver pronto, ele ficara disponivel no historico de arquivos.",
      title: "Exportacao iniciada",
    });
  }

  function handleSaveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderNotice({
      body: "As configuracoes da marca, aparencia e empresa foram salvas para esta sessao do painel.",
      title: "Configuracoes atualizadas",
    });
  }

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setLogoPreview(typeof reader.result === "string" ? reader.result : null);
    });
    reader.readAsDataURL(file);
  }

  const currentScreen = screenCopy[activeSection];
  const primaryHover = createPrimaryHover(primaryColor);
  const brandLogo = logoPreview ? <img alt={`${brandName} logo`} className="demo-brand-logo" src={logoPreview} /> : <Badge variant="info">AK</Badge>;

  return (
    <AtomKitProvider
      data-demo-font-scale={fontScale}
      theme={themeName}
      tokens={{
        colors: {
          focus: `${primaryColor}2e`,
          primary: primaryColor,
          primaryHover,
        },
        density,
        fontFamily: panelFontFamily,
      }}
    >
      <AppShell
        fullHeight
        layout="dashboard"
        header={
          <Header
            actions={
              <div className="demo-header-actions">
                <Tooltip content="Tema aplicado pelo AtomKitProvider">
                  <Button
                    iconLeft={<FiSliders />}
                    onClick={() => setThemePanelOpen((open) => !open)}
                    size="sm"
                    variant={themePanelOpen ? "primary" : "outline"}
                  >
                    Tema
                  </Button>
                </Tooltip>
                <Button icon={<FiBell />} iconOnly size="sm" variant="ghost">
                  Notificacoes
                </Button>
                <Button iconLeft={<FiPlus />} size="sm">
                  Novo pedido
                </Button>
              </div>
            }
            logo={brandLogo}
            title={brandName}
          />
        }
        sidebar={
          <Sidebar
            footer={<Badge variant="success">Tema: {themeName}</Badge>}
            profileSlot={
              <div className="demo-profile">
                <span className="demo-profile-brand">{brandLogo}</span>
                <strong>{brandName}</strong>
                <span>Painel comercial</span>
              </div>
            }
            width={292}
          >
            <NavigationTree activeId={activeSection} compact groups={navigationGroups} searchable title="Navegacao" width="100%" />
          </Sidebar>
        }
        footer={<Footer content="AtomKit Commerce - painel operacional" variant="muted" />}
      >
        <Container size="xl">
          <Section
            className="demo-section"
            description={currentScreen.description}
            title={currentScreen.title}
          >
            {themePanelOpen ? (
              <Card className="demo-theme-panel" description="Troque o tema para ver todos os componentes herdando os mesmos tokens." title="Temas">
                <ThemeSwitcher onThemeChange={setThemeName} value={themeName} />
              </Card>
            ) : null}

            <div className="demo-toolbar">
              <Input iconLeft={<FiSearch />} placeholder="Buscar clientes, pedidos ou produtos" />
              <Button iconLeft={<FiActivity />} variant="outline">
                Sincronizar
              </Button>
            </div>

            {activeSection === "dashboard" ? (
              <>
                <div className="demo-stats">
                  <StatsCard description="vs. mes anterior" icon={<FiDollarSign />} label="Receita" trend="+18%" value="R$ 42.8k" />
                  <StatsCard description="pedidos finalizados" icon={<FiShoppingBag />} label="Vendas" trend="+32" value="186" />
                  <StatsCard description="clientes ativos" icon={<FiUsers />} label="Clientes" trend="+9%" value="1.248" />
                  <StatsCard description="taxa de pagamento" icon={<FiCheckCircle />} label="Conversao" trend="74%" value="3.8%" />
                </div>

                <div className="demo-grid demo-grid--charts">
                  <Card actions={<Badge variant="info">Ao vivo</Badge>} description="Receita consolidada dos ultimos seis meses." icon={<FiBarChart2 />} title="Receita por mes">
                    <LineChart data={salesData} height={260} showGrid showTooltip xKey="month" yKey="value" />
                  </Card>

                  <Card description="Sinais compactos para acompanhar o dia comercial." icon={<FiActivity />} title="Sinais operacionais">
                    <div className="demo-chart-stack">
                      <Sparkline data={sparklineData} height={76} showTooltip xKey="step" yKey="value" />
                      <BarChart data={salesData.slice(0, 5)} height={150} showTooltip xKey="month" yKey="value" />
                      <DonutChart data={themeShareData} height={190} labelKey="theme" showLegend valueKey="value" />
                    </div>
                  </Card>
                </div>

                <div className="demo-grid demo-grid--three">
                  <Card description="Pedidos com pagamento ainda nao confirmado." icon={<FiCreditCard />} title="Fila financeira">
                    <div className="demo-list">
                      <span>#1023 - Bruno Costa</span>
                      <Badge variant="warning">Pendente</Badge>
                      <span>#1021 - Diego Alves</span>
                      <Badge variant="danger">Cancelado</Badge>
                    </div>
                  </Card>
                  <Card description="Clientes que precisam de contato do time comercial." icon={<FiUsers />} title="Atendimento">
                    <div className="demo-list">
                      <span>Costa Retail</span>
                      <Badge variant="warning">Analise</Badge>
                      <span>Alves Supply</span>
                      <Badge variant="danger">Bloqueado</Badge>
                    </div>
                  </Card>
                  <Card description="Acoes recomendadas para esta semana." icon={<FiCheckCircle />} title="Prioridades">
                    <div className="demo-list demo-list--single">
                      <span>Revisar cobrancas pendentes</span>
                      <span>Atualizar carteira de clientes ativos</span>
                      <span>Exportar relatorio mensal</span>
                    </div>
                  </Card>
                </div>
              </>
            ) : null}

            {activeSection === "customers" ? (
              <div className="demo-grid demo-grid--work">
                <Card
                  actions={<Badge variant="info">{customers.length} clientes</Badge>}
                  description="Carteira comercial com responsavel, empresa, email e status de atendimento."
                  icon={<FiUsers />}
                  title="Carteira de clientes"
                >
                  <DataTable
                    bordered
                    columns={customerColumns}
                    data={customers}
                    density="compact"
                    getRowId={(row) => row.id}
                    rowActions={[
                      {
                        icon: <FiSearch />,
                        label: "Abrir",
                        onClick: handleOpenCustomer,
                      },
                    ]}
                    striped
                  />
                </Card>

                <Card description="Registre um cliente e envie o convite de acesso ao portal." icon={<FiUser />} title="Novo cliente">
                  <form className="demo-form" onSubmit={handleClientSubmit}>
                    <FormField
                      label="Nome"
                      labelIcon={<FiUser />}
                      onChange={(event) => setClientForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Nome do cliente"
                      required
                      value={clientForm.name}
                    />
                    <FormField
                      helperText="Usado para envio de convite."
                      label="Email"
                      onChange={(event) => setClientForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="cliente@email.com"
                      type="email"
                      value={clientForm.email}
                    />
                    <label className="ak-field">
                      <span className="ak-field__label">
                        <span className="ak-label-content">
                          <span className="ak-icon">
                            <FiBox />
                          </span>
                          <span>Empresa</span>
                        </span>
                      </span>
                      <Select
                        iconLeft={<FiBox />}
                        onChange={(event) => setClientForm((current) => ({ ...current, company: event.target.value }))}
                        onValueChange={(nextValue) => setClientForm((current) => ({ ...current, company: nextValue }))}
                        options={companyOptions}
                        placeholder="Selecione uma empresa"
                        searchable
                        searchLabel="Buscar empresa"
                        searchPlaceholder="Digite o nome da empresa..."
                        value={clientForm.company}
                      />
                    </label>
                    <Button fullWidth iconLeft={<FiPlus />} type="submit">
                      Cadastrar cliente
                    </Button>
                  </form>
                </Card>
              </div>
            ) : null}

            {activeSection === "orders" ? (
              <Card
                actions={
                  <div className="demo-card-actions">
                    {selectedOrders.length ? <Badge variant="info">{selectedOrders.length} selecionado(s)</Badge> : null}
                    <Button iconLeft={<FiSend />} onClick={handleGenerateCharge} size="sm" variant="outline">
                      Gerar cobranca
                    </Button>
                    <Button iconLeft={<FiCheckCircle />} onClick={handleMarkPaid} size="sm" variant="success">
                      Marcar pago
                    </Button>
                  </div>
                }
                description="Selecione pedidos para gerar cobranca, atualizar pagamento ou abrir detalhes."
                icon={<FiCreditCard />}
                title="Pedidos recentes"
              >
                <DataTable
                  bordered
                  columns={orderColumns}
                  data={orders}
                  density="compact"
                  getRowId={(row) => row.id}
                  onSelectionChange={setSelectedOrders}
                  rowActions={[
                    {
                      icon: <FiSearch />,
                      label: "Abrir",
                      onClick: handleOpenOrder,
                    },
                  ]}
                  selectable
                  striped
                />
              </Card>
            ) : null}

            {activeSection === "reports" ? (
              <>
                <div className="demo-grid demo-grid--charts">
                  <Card
                    actions={
                      <Button iconLeft={<FiSend />} onClick={handleExportReport} size="sm" variant="outline">
                        Exportar
                      </Button>
                    }
                    description="Evolucao de receita consolidada por periodo."
                    icon={<FiBarChart2 />}
                    title="Performance comercial"
                  >
                    <LineChart data={salesData} height={280} showGrid showTooltip xKey="month" yKey="value" />
                  </Card>
                  <Card description="Distribuicao por canais e temas comerciais." icon={<FiActivity />} title="Distribuicao">
                    <DonutChart data={themeShareData} height={260} labelKey="theme" showLegend valueKey="value" />
                  </Card>
                </div>
                <Card description="Comparativo dos principais indicadores contra o periodo anterior." icon={<FiGrid />} title="Indicadores do periodo">
                  <DataTable bordered columns={reportColumns} data={reportRows} density="compact" striped />
                </Card>
              </>
            ) : null}

            {activeSection === "settings" ? (
              <div className="demo-grid demo-grid--work">
                <Card className="demo-card--overflow-visible" description="Ajuste o tema aplicado ao painel operacional." icon={<FiSliders />} title="Aparencia">
                  <div className="demo-settings-stack">
                    <div className="demo-settings-group">
                      <span className="demo-settings-label">Tema</span>
                      <ThemeSwitcher onThemeChange={setThemeName} value={themeName} />
                    </div>
                    <div className="demo-settings-group">
                      <span className="demo-settings-label">Tamanho da fonte</span>
                      <div className="demo-theme-switcher" aria-label="Selecionar tamanho da fonte">
                        {fontScaleOptions.map((option) => (
                          <Button
                            key={option.value}
                            onClick={() => setFontScale(option.value)}
                            size="sm"
                            variant={fontScale === option.value ? "primary" : "outline"}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="demo-settings-group">
                      <span className="demo-settings-label">Densidade</span>
                      <div className="demo-theme-switcher" aria-label="Selecionar densidade">
                        <Button onClick={() => setDensity("comfortable")} size="sm" variant={density === "comfortable" ? "primary" : "outline"}>
                          Confortavel
                        </Button>
                        <Button onClick={() => setDensity("compact")} size="sm" variant={density === "compact" ? "primary" : "outline"}>
                          Compacta
                        </Button>
                      </div>
                    </div>
                    <label className="ak-field">
                      <span className="ak-field__label">Fonte do painel</span>
                      <Select
                        iconLeft={<FiSliders />}
                        onChange={(event) => setPanelFontFamily(event.target.value)}
                        onValueChange={setPanelFontFamily}
                        options={fontFamilyOptions}
                        searchable
                        searchLabel="Buscar fonte"
                        searchPlaceholder="Digite o nome da fonte..."
                        value={panelFontFamily}
                      />
                    </label>
                    <label className="ak-field">
                      <span className="ak-field__label">Cor principal dos botoes</span>
                      <span className="demo-color-control">
                        <input
                          aria-label="Cor principal dos botoes"
                          className="demo-color-input"
                          onChange={(event) => setPrimaryColor(event.target.value)}
                          type="color"
                          value={primaryColor}
                        />
                        <Input onChange={(event) => setPrimaryColor(event.target.value)} value={primaryColor} />
                      </span>
                    </label>
                  </div>
                </Card>
                <Card className="demo-card--overflow-visible" description="Logo, nome exibido e dados usados em documentos, emails e cobrancas." icon={<FiSettings />} title="Marca e empresa">
                  <form className="demo-form" onSubmit={handleSaveSettings}>
                    <label className="ak-field">
                      <span className="ak-field__label">Logo</span>
                      <span className="demo-logo-upload">
                        <span className="demo-logo-preview">{brandLogo}</span>
                        <input accept="image/*" className="demo-file-input" onChange={handleLogoUpload} type="file" />
                      </span>
                    </label>
                    <FormField label="Nome da empresa" onChange={(event) => setBrandName(event.target.value)} value={brandName} />
                    <FormField defaultValue="financeiro@atomkit.local" label="Email financeiro" type="email" />
                    <label className="ak-field">
                      <span className="ak-field__label">Moeda padrao</span>
                      <Select
                        defaultValue="BRL"
                        options={[
                          { label: "Real brasileiro (R$)", value: "BRL" },
                          { label: "Dolar americano (US$)", value: "USD" },
                          { label: "Euro (EUR)", value: "EUR" },
                          { label: "Libra esterlina (GBP)", value: "GBP" },
                          { label: "Peso argentino (ARS)", value: "ARS" },
                        ]}
                        searchable
                        searchLabel="Buscar moeda"
                        searchPlaceholder="Digite nome ou codigo..."
                      />
                    </label>
                    <Button fullWidth iconLeft={<FiCheckCircle />} type="submit">
                      Salvar configuracoes
                    </Button>
                  </form>
                </Card>
              </div>
            ) : null}
          </Section>
        </Container>
      </AppShell>
      {createdClientName ? (
        <div className="demo-modal-backdrop">
          <Card
            aria-modal="true"
            actions={
              <Button icon={<FiX />} iconOnly onClick={() => setCreatedClientName(null)} size="sm" variant="ghost">
                Fechar
              </Button>
            }
            className="demo-modal"
            icon={<FiCheckCircle />}
            role="dialog"
            title="Cliente cadastrado com sucesso"
            variant="outlined"
          >
            <div className="demo-modal__body">
              <p>
                O cadastro de <strong>{createdClientName}</strong> foi salvo e já está disponível na carteira comercial.
              </p>
              <p>Um convite de acesso será enviado para o email informado assim que a análise inicial for concluída.</p>
              <div className="demo-modal__actions">
                <Button onClick={() => setCreatedClientName(null)} variant="outline">
                  Continuar no painel
                </Button>
                <Button iconLeft={<FiUsers />} onClick={() => setCreatedClientName(null)}>
                  Ver clientes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
      {orderNotice ? (
        <div className="demo-modal-backdrop">
          <Card
            aria-modal="true"
            actions={
              <Button icon={<FiX />} iconOnly onClick={() => setOrderNotice(null)} size="sm" variant="ghost">
                Fechar
              </Button>
            }
            className="demo-modal"
            icon={<FiCheckCircle />}
            role="dialog"
            title={orderNotice.title}
            variant="outlined"
          >
            <div className="demo-modal__body">
              <p>{orderNotice.body}</p>
              <div className="demo-modal__actions demo-modal__actions--single">
                <Button onClick={() => setOrderNotice(null)}>Entendi</Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </AtomKitProvider>
  );
}
