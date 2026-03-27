# Relatório

## Problemas encontrados

- A instalação falhou com `npm install` em ambiente atual por conflito de peer dependencies entre `react-scripts@5.0.1` e a versão de TypeScript resolvida pelo npm.
- O build também falhou inicialmente com `Cannot find module 'ajv/dist/compile/codegen'`.
- O projeto depende de um toolchain mais antigo do Create React App e está sensível a versões mais novas do npm.

## Impacto

- A documentação original com `npm install` não cobre todos os casos de instalação.
- O projeto pode exigir dependências de compatibilidade adicionais para compilar.

## Plano de ação

1. Alinhar a versão do TypeScript com a faixa suportada por `react-scripts@5`.
2. Substituir `resolutions` por `overrides` para que o npm aplique os pins de transitive dependencies.
3. Gerar e versionar `package-lock.json` para tornar a instalação reproduzível.
4. Atualizar o README para documentar o fluxo padrão com `npm install` e o fluxo reprodutível com `npm ci`.
5. Validar o ambiente com reinstalação limpa das dependências e `npm run build`.

## Implementação realizada

- `typescript` foi fixado em `4.9.5`, eliminando o conflito de peer dependency com `react-scripts@5.0.1`.
- Os pins de `nth-check` e `postcss` foram migrados para `overrides`, compatíveis com npm.
- Um `package-lock.json` foi gerado a partir da árvore corrigida.
- O README foi ajustado para remover workarounds manuais com `--legacy-peer-deps` e instalação avulsa de `ajv`.
- A validação final passou com `npm ci` e `npm run build`.
