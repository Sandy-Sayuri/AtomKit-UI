# AtomKit UI

Biblioteca de componentes React baseada em Atomic Design, com foco em customizacao visual e suporte a temas.

## Objetivo

O AtomKit UI fornece componentes reutilizaveis, tipados e independentes de regra de negocio. O diferencial da biblioteca e permitir que cada produto use temas prontos ou personalize tokens visuais como cores, radius, espacamento, sombra, fonte e densidade.

## Stack

- React
- TypeScript
- Vite
- Storybook
- npm
- Atomic Design

## Estrutura

```txt
src/
  components/
    atoms/
      Badge/
      Button/
      Input/
    molecules/
      Field/
    organisms/
      Card/
      DataTable/
  styles/
    index.css
  theme/
    AtomKitProvider.tsx
    tokens.ts
  index.ts
```

## Temas prontos

- `light`
- `dark`
- `corporate`
- `minimal`
- `soft`
- `terminal`

## Tokens customizaveis

```ts
type AtomKitTokenOverrides = {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    surface?: string;
    text?: string;
    border?: string;
  };
  radius?: string;
  spacing?: string;
  shadow?: string;
  fontFamily?: string;
  density?: "compact" | "comfortable";
};
```

A biblioteca tambem possui tokens semanticos internos para estados de UI, como `danger`, `success`, `warning` e `info`. Eles sao aplicados por CSS variables para evitar cores fixas espalhadas nos componentes.

## Uso

```tsx
import { AtomKitProvider, Button, Card, FormField } from "atomkit-ui";
import "atomkit-ui/styles";

export function App() {
  return (
    <AtomKitProvider theme="corporate">
      <Card title="Cadastro" description="Formulario com tema corporate.">
        <FormField label="Email" placeholder="nome@email.com" required />
        <Button>Salvar</Button>
      </Card>
    </AtomKitProvider>
  );
}
```

## Override parcial de tokens

```tsx
<AtomKitProvider
  theme="light"
  tokens={{
    colors: {
      primary: "#be123c",
      primaryHover: "#9f1239",
      background: "#fff7f8",
    },
    radius: "14px",
    density: "compact",
  }}
>
  <Button>Acao customizada</Button>
</AtomKitProvider>
```

## Componentes iniciais

- `Button`: variants `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `link`; sizes `sm`, `md`, `lg`, `xl`; suporta `loading`, `fullWidth`, `iconLeft` e `iconRight`.
- `IconButton`: botao apenas com icone e label acessivel.
- `Input`: sizes, disabled, erro, helper text e icones laterais.
- `FormField`: label, required, erro e helper text. `Field` continua exportado como alias.
- `Alert`: mensagem contextual com icone customizavel.
- `Tooltip`: dica simples com trigger e icone opcional.
- `Accordion`: lista expansivel com icones por item.
- `Tabs`: abas com icones por item.
- `Card`: variants `elevated`, `outlined`, `ghost` e padding customizavel.
- `Badge`: variants `default`, `success`, `warning`, `danger`, `info`.
- `DataTable`: colunas, dados, loading, empty state, sorting, row actions, selecao, density, striped e bordered.
- `EmptyState`: estado vazio com icone grande e acao opcional.
- `StatsCard`: card de metrica com icone e tendencia.

## Layout e Navegacao

A biblioteca tambem inclui componentes visuais para montar estruturas de aplicacao sem regra de negocio acoplada:

- `AppShell`
- `Header`
- `Footer`
- `Sidebar`: renderiza `Menu` por `items` ou aceita `children` para composicoes como `NavigationTree`.
- `Container`
- `Section`
- `Menu`
- `MenuItem`
- `NavigationTree`
- `DropdownMenu`
- `NestedMenu`
- `Breadcrumb`
- `Tabs`

Exemplo:

```tsx
<Menu
  orientation="vertical"
  currentRole="admin"
  items={[
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Administracao",
      roles: ["admin"],
      children: [
        { label: "Usuarios", href: "/users" },
        { label: "Permissoes", href: "/permissions" },
      ],
    },
  ]}
/>
```

## Renderizacao Condicional

Os helpers abaixo sao apenas visuais. Eles nao substituem autenticacao, autorizacao ou validacao no backend.

- `RenderIf`
- `RenderByRole`
- `ProtectedContent`

```tsx
<RenderByRole allowedRoles={["admin"]} currentRole="admin">
  <Button>Editar configuracoes</Button>
</RenderByRole>
```

## NavigationTree

`NavigationTree` e um menu lateral hierarquico inspirado em sidebars de documentacao. Ele suporta grupos, multiplos niveis, busca, estados ativos, badges, icones, emojis, links externos, itens disabled, footer/header customizados, modo compacto, largura/altura customizadas e overrides visuais por props.

```tsx
<NavigationTree
  title="AtomKit UI"
  searchable
  activeId="form-field"
  indentSize={18}
  themeOverrides={{
    background: "#111827",
    textColor: "#e5e7eb",
    activeBackground: "#2563eb",
    activeTextColor: "#ffffff",
    groupLabelColor: "#94a3b8",
    hoverBackground: "#1f2937",
    radius: "8px",
  }}
  groups={[
    {
      id: "docs",
      label: "Docs",
      emoji: "📘",
      defaultOpen: true,
      items: [
        { id: "introduction", label: "Introduction", emoji: "📄" },
        { id: "getting-started", label: "Getting Started" },
      ],
    },
    {
      id: "components",
      label: "Components",
      emoji: "🧩",
      defaultOpen: true,
      items: [
        { id: "button", label: "Button" },
        {
          id: "form-field",
          label: "FormField",
          badge: "stable",
          children: [{ id: "basic-example", label: "Basic Example" }],
        },
      ],
    },
  ]}
/>
```

## Icones Externos

A AtomKit UI nao cria nem obriga uma biblioteca propria de icones. Os componentes aceitam `ReactNode`, entao funcionam com React Icons, Lucide, Heroicons, SVG customizado, emojis ou qualquer outro elemento React.

Exemplo com React Icons:

```tsx
import { FiArrowRight, FiCheck, FiEdit, FiMail, FiSearch, FiUpload } from "react-icons/fi";
import { Badge, Button, DataTable, FormField, Input } from "atomkit-ui";

<Button iconLeft={<FiSearch />}>Buscar</Button>

<Button iconRight={<FiArrowRight />}>Continuar</Button>

<Button iconTop={<FiUpload />}>Enviar arquivo</Button>

<FormField label="E-mail" labelIcon={<FiMail />}>
  <Input />
</FormField>

<Badge iconLeft={<FiCheck />}>Ativo</Badge>

<DataTable
  columns={columns}
  data={rows}
  rowActions={[
    {
      label: "Editar",
      icon: <FiEdit />,
      onClick: (row) => console.log(row),
    },
  ]}
/>
```

React Icons e usado apenas nos exemplos do Storybook como `devDependency`; nao e uma dependencia obrigatoria para consumidores da biblioteca.

## Graficos SVG

A biblioteca possui um sistema autoral de graficos em `src/charts`, construido com SVG, React e TypeScript, sem dependencias externas de charts.

- `LineChart`
- `BarChart`
- `AreaChart`
- `PieChart`
- `DonutChart`
- `Sparkline`

Os graficos usam os mesmos design tokens da AtomKit UI e respeitam `AtomKitProvider`, temas prontos e overrides parciais.

Tooltips dos graficos ficam ancorados no elemento ativo:

- `LineChart`, `AreaChart` e `Sparkline`: tooltip proximo ao ponto ativo.
- `BarChart`: tooltip proximo a barra ativa.
- `PieChart` e `DonutChart`: tooltip proximo a fatia ativa.
- Hover e foco por teclado sao suportados.
- A posicao e ajustada automaticamente para evitar que o tooltip saia da area visivel do grafico.
- `renderTooltip` permite substituir o conteudo.
- `tooltipStyle` permite sobrescrever cores, radius, sombra e tipografia sem quebrar os tokens globais.

Exemplo:

```tsx
<LineChart
  data={salesData}
  xKey="month"
  yKey="value"
  height={260}
  colors={{
    line: "#7c3aed",
    area: "rgba(124, 58, 237, 0.16)",
    grid: "#e5e7eb",
    text: "#374151",
  }}
  showGrid
  showTooltip
  showLegend
  animated
/>
```

Exemplo com tooltip customizado:

```tsx
<LineChart
  data={salesData}
  xKey="month"
  yKey="value"
  showTooltip
  renderTooltip={(payload) => (
    <div>
      <strong>{payload.label}</strong>
      <div>{payload.value} vendas</div>
    </div>
  )}
  tooltipStyle={{
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: 10,
    boxShadow: "0 16px 40px rgba(17, 24, 39, 0.22)",
    color: "#ffffff",
    fontFamily: "Inter, sans-serif",
  }}
/>
```

## Storybook

```bash
npm install
npm run storybook
```

A story `Theme/AtomKitProvider` documenta a troca de temas e exemplos de customizacao parcial.

## Documentation App proprio

O projeto tambem possui um site proprio de documentacao, separado do Storybook, em `docs-app/`.

```bash
npm run docs
```

Abra a URL mostrada pelo Vite, normalmente:

```txt
http://127.0.0.1:5173
```

Esse app usa `vite.docs.config.ts`, importa componentes pela API publica local em `src/index.ts` e renderiza a documentacao com `AtomKitProvider`, `AppShell`, `Header`, `Sidebar`, `NavigationTree`, `Card`, `Button`, `Badge`, `Tooltip`, `Accordion`, `DataTable`, `FormField`, `Input` e charts SVG. Para gerar a versao estatica:

```bash
npm run build-docs
```

## Showcase com a propria AtomKit UI

A documentacao tambem possui uma vitrine montada com os proprios componentes da biblioteca em `Showcase/Documentation App`.

Essa tela usa componentes reais da AtomKit UI:

- `AtomKitProvider`
- `AppShell`
- `Header`
- `Sidebar`
- `NavigationTree`
- `Button`
- `Card`
- `Badge`
- `Tooltip`
- `Accordion`
- `DataTable`
- `FormField`
- `Input`
- charts SVG (`LineChart`, `BarChart`, `DonutChart`, `Sparkline`)
- design tokens e temas via `AtomKitProvider`

O showcase importa esses componentes pela API publica da biblioteca, possui uma secao **Components used on this page** e permite alternar entre `light`, `dark`, `corporate`, `minimal`, `soft` e `terminal`, atualizando visualmente a propria documentacao. Tambem existe a story `Showcase/System Preview`, que mostra uma tela ficticia combinando layout, cards, tabela, grafico, formulario, alert e accordion.

## Documentacao com Componentes AtomKit

As paginas MDX do Storybook tambem usam componentes internos da propria biblioteca para evitar documentacao com HTML padrao. A camada fica em `src/docs/internal`:

- `DocsPage`: estrutura padrao com `AtomKitProvider`, `AppShell`, `Header`, `Container`, `Section`, `Card`, `Badge` e troca de tema.
- `ThemeSwitcher`: alterna entre `light`, `dark`, `corporate`, `minimal`, `soft` e `terminal` e atualiza visualmente a pagina.
- `CodeBlock`: bloco de codigo montado com `Card` e `Button` de copiar.
- `PropsTable`: tabela de props montada com `DataTable`.

Ao alterar ou criar paginas de documentacao, prefira usar componentes da AtomKit UI em vez de HTML puro quando existir componente equivalente.

## Executar no VS Code

O projeto possui configuracao em `.vscode/launch.json`.

No VS Code:

1. Abra a aba **Executar e Depurar**.
2. Escolha **AtomKit UI: Storybook**.
3. Clique em **Executar**.
4. Acesse o Storybook em `http://localhost:6006`.

Tambem existem configuracoes para:

- `AtomKit UI: Build`
- `AtomKit UI: Lint`
- `AtomKit UI: Build Storybook`

As tasks equivalentes ficam em `.vscode/tasks.json`.

## Guia para IA

O arquivo `AGENTS.md` documenta o contexto do projeto, regras para assistentes de IA, estrutura esperada, comandos de validacao e cuidados de arquitetura.

Sempre que uma mudanca relevante for feita na biblioteca, atualize tambem o `README.md` e o `AGENTS.md` para manter a documentacao humana e o contexto de IA sincronizados.

## Build

```bash
npm run build
```

O build gera JavaScript, CSS e declaracoes TypeScript em `dist/`.

## Preparacao para Angular

Os tokens ficam isolados em `src/theme/tokens.ts` e sao convertidos para CSS variables por `tokensToCssVariables`. Essa separacao deixa a camada visual reaproveitavel por outras stacks no futuro, incluindo Angular, sem depender do provider React.
