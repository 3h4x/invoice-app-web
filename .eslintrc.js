// eslint config

module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'next',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'import', 'unused-imports', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        endOfLine: 'auto',
        bracketSameLine: true,
        semi: false,
        parser: 'typescript',
        printWidth: 120,
        singleQuote: true,
        jsxSingleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'func-names': [2, 'as-needed'],
    'react/forbid-prop-types': 0,
    'implicit-arrow-linebreak': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'curly': 0,
    'nonblock-statement-body-position': 0,
    'no-plusplus': 0,
    'no-confusing-arrow': 0,
    'react/prop-types': 1,
    '@typescript-eslint/no-empty-interface': 0,
    'no-var': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-use-before-define': 0,
    'react/jsx-closing-bracket-location': 0,
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unused-modules': 1,
    'unused-imports/no-unused-imports-ts': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: "**/*.css",
            group: "type",
            position: 'after',
          }

        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        warnOnUnassignedImports: true,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
}
