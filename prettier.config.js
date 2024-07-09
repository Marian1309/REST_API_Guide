/** @type {import('prettier').Config} */

const prettierConfig = {
  printWidth: 80,
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  arrowParens: 'always',
  useTabs: false,
  quoteProps: 'as-needed',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/types',
    '^@/db',
    '^@/helpers',
    '^[../]',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
};

const withTailwind = {
  ...prettierConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports']
};

module.exports = prettierConfig;
