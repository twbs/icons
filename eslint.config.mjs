import js from '@eslint/js'
import globals from 'globals'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // global ignores
  {
    ignores: [
      '**/*.min.js',
      '**/dist/**',
      '**/vendor/**',
      '_site/**',
      'node_modules/**',
      'resources/**',
      '**/.fantasticonrc.js'
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.nodeBuiltin
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },
  js.configs.recommended,
  {
    files: [
      '**/*.js',
      '**/*.mjs'
    ],
    rules: {
      'no-return-await': 'error',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'prefer-template': 'error',
      semi: [
        'error',
        'never'
      ],
      strict: 'error'
    }
  },
  {
    files: [
      'docs/assets/js/**'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
]
