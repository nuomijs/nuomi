module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['prettier'],
  rules: {
    'no-return-assign': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'react/static-property-placement': 0,
    'react/sort-comp': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-has-content': 0,
  },
  globals: {
    global: true,
    window: true,
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    impliedStrict: true,
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
