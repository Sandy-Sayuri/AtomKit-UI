# AtomKit UI - Guia para IA

## Contexto

AtomKit UI e uma biblioteca de componentes React + TypeScript baseada em Atomic Design. O foco principal do projeto e customizacao visual por design tokens, temas e componentes reutilizaveis.

## Objetivo da Biblioteca

- Criar componentes pequenos, tipados e independentes de regra de negocio.
- Usar Storybook como documentacao e showcase principal.
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
npm run storybook
npm run build
npm run lint
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
10. Rodar `npm run build`, `npm run lint` e, quando alterar stories/docs, `npm run build-storybook`.

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
- `FormField`
- `Card`
- `Badge`
- `DataTable`

Graficos:

- `LineChart`
- `BarChart`
- `AreaChart`
- `DonutChart`
- `Sparkline`

## Storybook

Storybook e a vitrine oficial da biblioteca.

Ao criar ou alterar componentes:

- criar/atualizar stories;
- incluir exemplos de estados e variantes;
- documentar uso, props principais e comportamento;
- manter exemplos com dados mockados quando fizer sentido.

## Charts

Charts devem continuar autorais, usando SVG + React + TypeScript.

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
npm run build-storybook
```

