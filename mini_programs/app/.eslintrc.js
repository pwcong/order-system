module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'eslint:recommended',
  // required to lint *.wpy files
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    semi: ['error', 'always'],
    indent: 0,
    'no-unused-vars': 0,
    'no-empty': 0
  }
};
