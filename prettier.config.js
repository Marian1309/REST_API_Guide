/** @type {import('prettier').Config} */

const prettierConfig = {
  printWidth: 80,
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  useTabs: false,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/types',
    '^@/constants',
    '^@/schemas/(.*)$',
    '^@/models/(.*)$',
    '^@/routes/(.*)$',
    '^@/controllers/(.*)$',
    '^@/services/(.*)$',
    '^@/helpers/(.*)$',
    '^[../]',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
};

module.exports = prettierConfig;
