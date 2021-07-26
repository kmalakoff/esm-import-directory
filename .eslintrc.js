module.exports = {
  extends: ['standard', 'prettier'],
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.mjs', '.js', '.json'] },
    },
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'always', { 'js': 'never' }],
    'no-throw-literal': 'off',
  },
};
