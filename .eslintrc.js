module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier/@typescript-eslint'],
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
};
