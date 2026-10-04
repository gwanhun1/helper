const parser = require('@typescript-eslint/parser');
const reactHooks = require('eslint-plugin-react-hooks');
module.exports = [
  { ignores: ['node_modules/**', 'android/**', 'ios/**'] },
  { files: ['**/*.{ts,tsx}'], languageOptions: { parser, parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } } }, plugins: { 'react-hooks': reactHooks }, rules: { 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn' } },
];
