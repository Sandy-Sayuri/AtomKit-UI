# AtomKit UI - Guia para IA

## Contexto

AtomKit UI e uma biblioteca de componentes React + TypeScript baseada em Atomic Design. O foco principal do projeto e customizacao visual por design tokens, temas e componentes reutilizaveis.

## Objetivo da Biblioteca

- Criar componentes pequenos, tipados e independentes de regra de negocio.
- Usar Storybook como documentacao e showcase principal.
- Manter `docs-app/` como uma demo app simples de uso real da biblioteca, nao como documentacao duplicada.
- Manter temas prontos e override parcial de tokens.
- Renderizar graficos autorais com SVG, sem bibliotecas externas de charts.
- Preparar a arquitetura de tokens para reaproveitamento futuro em outras stacks.

## Stack

- React
- TypeScript
- Vite
- Storybook
- npm
- SVG para charts

## Comandos Principais

```bash
npm install
npm run docs
npm run build-docs
npm run storybook
npm run build
npm run lint
npm run pack:check
npm run build-storybook
```

## Estrutura Relevante

```txt
src/
  components/
    atoms/
    molecules/
    organisms/
      charts/
  charts/
    core/
    utils/
    components/
  docs/
  docs-app/
  mocks/
  styles/
  theme/
```

## Regras para IA

1. Nao publicar no npm.
2. Nao adicionar dependencias pesadas sem justificativa clara.
3. Nao usar bibliotecas externas de charts como Recharts, Chart.js ou ApexCharts.
4. Preservar a arquitetura atual.
5. Usar TypeScript bem tipado.
6. Preferir named exports.
7. Usar design tokens e CSS variables como padrao visual.
8. Evitar cores fixas nos componentes; permitir override por props ou tokens.
9. Documentar novos componentes no Storybook.
10. Atualizar `README.md` e este `AGENTS.md` sempre que uma mudanca relevante alterar API, comportamento, arquitetura, scripts, Storybook ou fluxo de uso.
11. Rodar `npm run build`, `npm run lint`, `npm run pack:check` e, quando alterar stories/docs, `npm run build-storybook`.
12. Nao executar `npm publish`. Preparacoes para pacote npm podem ser feitas, mas publicacao exige acao explicita do mantenedor fora do fluxo automatizado.

## Temas

Temas ficam em `src/theme/tokens.ts`.

Temas atuais:

- `light`
- `dark`
- `corporate`
- `minimal`
- `soft`
- `terminal`

Use `AtomKitProvider` para aplicar tema e overrides.

## Componentes

Componentes base:

- `Button`
- `Input`
- `Select`
- `FormField`
- `Card`
- `Badge`
- `DataTable`

Graficos:

- `LineChart`
- `BarChart`
- `AreaChart`
- `PieChart`
- `DonutChart`
- `Sparkline`

## Storybook

Storybook e a vitrine oficial da biblioteca.

Tambem existe uma demo app simples em `docs-app/`, executada por `npm run docs` e buildada por `npm run build-docs`. Ela deve simular uma aplicacao real pequena usando a AtomKit UI, importar componentes pela API publica local (`src/index.ts`) e nao duplicar a documentacao principal do Storybook.

A demo app e publicada no GitHub Pages pelo workflow `.github/workflows/pages.yml`. O build de Pages usa `GITHUB_PAGES=true` para aplicar `base: "/AtomKit-UI/"` e copia `index.html` para `404.html` como fallback de SPA, permitindo rotas como `/login` e `/dashboard`. A raiz e `/login` devem exibir a tela de login; `/dashboard` exibe o painel depois da entrada.

Ao criar ou alterar componentes:

- criar/atualizar stories;
- incluir exemplos de estados e variantes;
- documentar uso, props principais e comportamento;
- manter exemplos com dados mockados quando fizer sentido.

As paginas MDX de documentacao devem parecer uma aplicacao real construida com AtomKit UI. Use a camada `src/docs/internal`:

- `DocsPage` para estrutura padrao com `AtomKitProvider`, `AppShell`, `Header`, `Container`, `Section`, `Card`, `Badge` e troca de tema.
- `ThemeSwitcher` para alternar temas dentro da propria pagina.
- `CodeBlock` para exemplos de codigo com `Card` e `Button` de copiar.
- `PropsTable` para props usando `DataTable`.

A demo app em `docs-app/` deve importar componentes pela API publica da biblioteca e usar componentes reais na composicao principal: `AtomKitProvider`, `AppShell`, `Header`, `Sidebar`, `NavigationTree`, `Card`, `Button`, `Badge`, `Tooltip`, `DataTable`, `FormField`, `Input` e charts SVG. O seletor de tema deve trocar o tema real do `AtomKitProvider`, o menu lateral deve usar `NavigationTree`, e a tela deve demonstrar uma pagina de produto simples, como dashboard, tabela e formulario.

Evite HTML puro em documentacao quando existir componente equivalente na biblioteca. Nao documente componentes inexistentes como se estivessem prontos.

## Charts

Charts devem continuar autorais, usando SVG + React + TypeScript.

Tooltips dos charts:

- Devem ficar ancorados no elemento ativo, nunca fixos no canto do grafico.
- `LineChart`, `AreaChart` e `Sparkline` usam a coordenada do ponto ativo.
- `BarChart` usa a coordenada da barra ativa.
- `PieChart` e `DonutChart` usam uma coordenada proxima ao centro visual da fatia ativa.
- Devem funcionar com mouse hover e keyboard focus.
- Devem reposicionar automaticamente quando estiverem perto das bordas esquerda, direita ou superior.
- Devem aceitar `renderTooltip` para conteudo customizado.
- Devem aceitar `tooltipStyle` para override de cores, radius, sombra e tipografia.
- O visual padrao deve continuar usando tokens e CSS variables.

Dados mockados ficam em:

```txt
src/mocks/charts.ts
```

Utilitarios ficam em:

```txt
src/charts/utils/
```

Tipos e frame comum ficam em:

```txt
src/charts/core/
```

Exports publicos tambem passam por:

```txt
src/components/organisms/charts/
```

## Validacao Esperada

Antes de considerar uma mudanca pronta:

```bash
npm run build
npm run lint
npm run pack:check
npm run build-storybook
```
