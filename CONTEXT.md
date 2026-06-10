# Contexto do projeto AtomKit UI

Este documento resume o que foi feito na demo app e os pontos importantes para continuar o trabalho em outro chat.

## Objetivo atual

A AtomKit UI e uma biblioteca de componentes React + TypeScript baseada em Atomic Design. O projeto usa Storybook como vitrine principal e tambem possui uma demo app em `docs-app/` para mostrar os componentes funcionando como se fossem um sistema real.

## O que foi feito

- A `docs-app` foi transformada em uma demo chamada **AtomKit Commerce**.
- A demo simula um painel comercial real, com login, dashboard, clientes, pedidos, relatorios e configuracoes.
- O menu lateral usa `NavigationTree`.
- As telas usam componentes reais da biblioteca via API publica local em `src/index.ts`.
- Foram adicionadas interacoes reais na demo:
  - login de demonstracao;
  - cadastro de cliente com modal de confirmacao;
  - tabela de pedidos com selecao;
  - acoes em pedidos;
  - configuracoes de aparencia e marca.
- A tela de configuracoes permite customizar:
  - tema;
  - tamanho de fonte;
  - densidade;
  - fonte do painel;
  - cor principal dos botoes;
  - logo;
  - nome da empresa;
  - email financeiro;
  - moeda padrao.
- Foi criado/ajustado o componente `Select` da biblioteca com suporte a busca interna no dropdown.
- A `DataTable` foi evoluida para uma base avancada, mantendo compatibilidade com a API anterior.
- `AtomKitProvider` agora aceita `formatters` globais, consumidos por componentes como `DataTable`.
- Foram ajustados estilos para manter contraste correto em temas como `dark` e `corporate`.
- Foi adicionado favicon da demo app.
- A demo foi preparada para GitHub Pages.

## Rotas da demo app

Em desenvolvimento local:

```txt
http://localhost:5173/
http://localhost:5173/login
http://localhost:5173/dashboard
```

Comportamento esperado:

- `/` mostra a tela de login.
- `/login` mostra a tela de login.
- `/dashboard` mostra o painel comercial.
- Ao clicar em **Entrar no painel** ou **Ver demonstracao sem login**, a app navega para `/dashboard`.

No GitHub Pages, a URL esperada e:

```txt
https://sandy-sayuri.github.io/AtomKit-UI/
https://sandy-sayuri.github.io/AtomKit-UI/login
https://sandy-sayuri.github.io/AtomKit-UI/dashboard
```

Importante: o `base` configurado para GitHub Pages e `/AtomKit-UI/`. Se o nome do repositorio no GitHub for diferente, ajustar `vite.docs.config.ts`.

## Arquivos principais alterados/criados

- `docs-app/src/DocumentationApp.tsx`
  - App principal da demo.
  - Controla login, rotas simples, dashboard, telas internas e configuracoes.
- `docs-app/src/styles.css`
  - Estilos especificos da demo.
- `docs-app/index.html`
  - Titulo e favicon da demo.
- `docs-app/public/favicon.svg`
  - Icone da aba do navegador.
- `vite.docs.config.ts`
  - Config do Vite para `docs-app`.
  - Usa `base: "/AtomKit-UI/"` quando `GITHUB_PAGES=true`.
- `.github/workflows/pages.yml`
  - Workflow de deploy da demo para GitHub Pages.
  - Gera fallback SPA copiando `index.html` para `404.html`.
- `src/components/atoms/Select/`
  - Componente `Select` da biblioteca.
  - Suporta modo nativo e modo customizavel com busca.
- `src/components/organisms/DataTable/`
  - Tabela avancada com renderers, formatters, selecao, bulk actions, row actions, linhas expansivas, paginacao, export CSV, sticky header e responsive mode.
- `src/theme/formatters.ts`
  - Formatters globais prontos: `currency`, `date`, `datetime`, `percentage`, `number`, `phone`, `cpf` e `cnpj`.
- `src/theme/context.ts`
  - Contexto interno da AtomKit UI para expor formatters configurados pelo `AtomKitProvider`.
- `src/index.ts`
  - Export publico do `Select`.
- `src/styles/index.css`
  - Estilos globais dos componentes, incluindo `Select` e ajustes de estados ativos.
- `README.md`
  - Documentacao de uso, GitHub Pages, rotas, formatters globais e DataTable avancada.
- `AGENTS.md`
  - Regras do projeto e contexto para IA.

## Comandos principais

Instalar dependencias:

```bash
npm install
```

Rodar demo app:

```bash
npm run docs
```

Build da demo app:

```bash
npm run build-docs
```

Rodar Storybook:

```bash
npm run storybook
```

Build da biblioteca:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Build do Storybook:

```bash
npm run build-storybook
```

## Validacoes ja feitas

As validacoes abaixo foram executadas durante o trabalho e passaram:

```bash
npm run build-docs
npm run lint
npm run build
npm run build-storybook
```

Observacao: o `build-storybook` pode mostrar avisos normais do Storybook sobre `eval` interno e chunks grandes.

## GitHub Pages

O deploy esta configurado em `.github/workflows/pages.yml`.

Para funcionar:

- fazer push para `main` ou `master`;
- no GitHub, habilitar Pages em **Settings > Pages**;
- selecionar **Source: GitHub Actions**.

O workflow:

1. instala dependencias com `npm ci`;
2. roda `npm run build-docs` com `GITHUB_PAGES=true`;
3. publica `docs-static/`;
4. copia `docs-static/index.html` para `docs-static/404.html` para rotas SPA.

## Proximos passos sugeridos

- Conferir o nome real do repositorio no GitHub e ajustar o `base` se necessario.
- Fazer push das alteracoes para disparar o workflow do GitHub Pages.
- Testar as tres URLs publicas: `/`, `/login` e `/dashboard`.
- Se quiser evoluir a biblioteca, continuar pela DataTable: filtros por coluna, ordenacao controlada, paginacao controlada mais completa, testes unitarios e virtualizacao opcional.
- Evoluir charts SVG mantendo a arquitetura autoral, principalmente loading/empty state, legenda e animacoes.
- Se quiser evoluir a demo, adicionar persistencia fake via `localStorage` para configuracoes, clientes e pedidos.
