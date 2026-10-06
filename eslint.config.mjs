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
      '_site-astro/**',
      'astro/.astro/**',
      'docs/static/pagefind/**',
      'node_modules/**',
      'resources/**',
      '**/.fantasticonrc.js'
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
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
      '**/*.cjs'
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
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
