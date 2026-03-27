# AGENTS.md

## Visão Geral

Este repositório contém o frontend React do projeto Monday Countries. A aplicação
usa o SDK da monday.com para ler dados do board e consome o backend
`monday-countries-back` para buscar clima por país.

## Tecnologias Principais

| Categoria | Tecnologia | Evidência | Uso |
| --- | --- | --- | --- |
| Runtime | React 18 + TypeScript | `package.json`, `src/index.tsx` | UI principal |
| Plataforma | monday SDK | `package.json`, `src/services/mondayService.ts` | integração com board |
| Build | Create React App (`react-scripts`) | `package.json` | dev server e build |
| UI | Bootstrap + React Bootstrap | `package.json` | componentes e layout |
| Integração | Axios via `apiService.ts` | `src/services/apiService.ts` | clima por país |
| Exposição local | monday apps CLI + tunnel | `package.json` | `mapps tunnel:create` |

## Estrutura do Repositório

- `src/index.tsx`: bootstrap da aplicação React.
- `src/App.tsx`: orquestra carregamento inicial, busca e estado principal.
- `src/services/mondayService.ts`: chamadas GraphQL via `monday-sdk-js`.
- `src/services/apiService.ts`: acesso ao backend de clima.
- `src/graphql/queries.ts`: queries GraphQL.
- `src/components/`: tabela, modal e busca.
- `src/classes/country.ts`: modelo usado pela UI.
- `src/assets/categories/categories.json`: categorias e metadados do board.

## Setup e Comandos

- Variáveis esperadas:
  - `REACT_APP_EXPOSE_PORT`
  - `REACT_APP_WEATHER_API_URL`

```bash
npm install
npm start
npm run build
npm test
```

Se `npm install` falhar por peer dependencies, o README documenta `npm install --legacy-peer-deps`.

## Convenções e Limites

- Preserve a separação entre UI e serviços.
- Chamadas ao SDK da monday.com devem permanecer em `src/services/mondayService.ts`.
- Preserve o contrato consumido de `monday-countries-back`.
- Mudanças em queries GraphQL devem ser refletidas nos componentes e no modelo `Country`.
- Evite espalhar valores de schema do board; concentre-os em `graphql/` e `assets/categories/`.
- O fluxo de inicialização em `App.tsx` depende da carga inicial de categoria, colunas e itens; revise esse encadeamento com cuidado.

## Peculiaridades do Projeto

- `npm start` executa dois processos em paralelo: app React e túnel da monday.com.
- O projeto ainda usa Create React App, não Vite ou Next.js.
- O histórico de commits é incremental e ligado à evolução funcional do app.
