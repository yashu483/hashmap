import pluginJs from '@eslint/js';
import globals from 'globals';
import pluginJson from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['node_modules/', 'dist/', 'build/'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.recommended[0],
  },
  pluginJson.configs.recommended,
  markdown.configs.recommended,
  {
    files: ['**/*.css'],
    plugins: { css },
    languageOptions: {
      parser: css.parser,
    },
  },
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
