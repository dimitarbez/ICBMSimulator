module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Add any custom rules here
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  };