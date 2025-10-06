import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^@ideanick/backend/(?!(.*/)?input$).+$',
              message: 'Import from backend is only allowed for input files',
            },
          ],
        },
      ],
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
