import js from '@eslint/js';
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignore patterns
  {
    ignores: [
      'dist',
      'node_modules',
      '.astro',
      '*.min.js',
      '*.min.css',
      '.vercel',
      '.vscode',
      '*.d.ts',
    ],
  },

  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Config files (Node environment)
  {
    files: ['astro.config.*', 'tailwind.config.*', '*.config.*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
    },
  },

  // Astro component rules (browser environment)
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      // Relaxed rules for Astro templates
      'astro/no-set-html-directive': 'off',
      'astro/no-unused-define-vars-in-style': 'off',

      // Allow TypeScript features
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',

      // Relaxed rules
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },

  // TypeScript/JavaScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },
];
