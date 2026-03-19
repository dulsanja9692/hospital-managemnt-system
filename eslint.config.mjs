import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // ── Base configs ───────────────────────────────────────────────────────────
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,

  // ── TypeScript project settings ────────────────────────────────────────────
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // ── Custom rules ───────────────────────────────────────────────────────────
  {
    files: ['backend/src/**/*.ts'],
    rules: {
      // Prevent unused variables (allow underscore-prefixed)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Enforce explicit return types on exported functions
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Allow explicit any only when needed (warn instead of error)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Require await in async functions
      '@typescript-eslint/require-await': 'warn',

      // Consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // No console in production code
      'no-console': 'warn',

      // Require const over let when no reassignment
      'prefer-const': 'error',

      // No var
      'no-var': 'error',
    },
  },

  // ── Ignore patterns ────────────────────────────────────────────────────────
  {
    ignores: ['dist/', 'node_modules/', '*.js', '*.cjs', '*.mjs'],
  },
);
