const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-config-prettier');

// Browser globals
const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  location: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
  Blob: 'readonly',
  FormData: 'readonly',
  Event: 'readonly',
  Node: 'readonly',
  HTMLDivElement: 'readonly',
  HTMLSelectElement: 'readonly',
  KeyboardEvent: 'readonly',
  MouseEvent: 'readonly',
  IntersectionObserver: 'readonly',
  ResizeObserver: 'readonly',
  MessageChannel: 'readonly',
  MutationObserver: 'readonly',
  performance: 'readonly',
  atob: 'readonly',
  btoa: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  Worker: 'readonly',
  TextEncoder: 'readonly',
  TextDecoder: 'readonly',
  AbortController: 'readonly',
  queueMicrotask: 'readonly',
  DOMException: 'readonly',
};

// Deno globals
const denoGlobals = {
  Deno: 'readonly',
  Request: 'readonly',
  Response: 'readonly',
  fetch: 'readonly',
  AbortController: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  Headers: 'readonly',
};

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: browserGlobals,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Deno functions (for your supabase/functions/ and backups/supabase/ folders)
  {
    files: ['supabase/functions/**/*.ts', 'backups/supabase/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: denoGlobals,
    },
  },
  {
    files: ['*.js', '*.cjs'],
    ignores: ['dist/**', 'node_modules/**', 'build/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
      },
    },
  },
  prettierPlugin,
];
