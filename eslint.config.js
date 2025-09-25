const js = require('@eslint/js')
const typescript = require('@typescript-eslint/eslint-plugin')
const typescriptParser = require('@typescript-eslint/parser')
const prettier = require('eslint-config-prettier')

module.exports = [
  // Базовые правила JavaScript
  js.configs.recommended,

  // Правила для TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // Prettier интеграция
  prettier,

  // Игнорируемые файлы
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
]
