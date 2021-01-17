module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: '2017'
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'google', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prettier/prettier': ['error']
  }
}
