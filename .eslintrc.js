module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: { extensions: ['.mjs', '.js'] }
    },
  },
  rules: {
    'max-len': [2, {code: 160, tabWidth: 4}],
    'import/extensions': ['error', 'always', { js: 'never', mjs: 'never' }],
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  }
};