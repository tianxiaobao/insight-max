// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
    'arrow-spacing': 2,
    'brace-style': [2, "1tbs", { "allowSingleLine": true }],
    'camelcase': 2,
    'comma-dangle': 2,
    'indent': 2,
    'linebreak-style': 0,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-tabs': 2,
    'no-unused-vars': 2,
    'no-var': 2,
    'padded-blocks': ["error", "never"],
    'prefer-const': 2,
    'semi': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': 2,
    'spaced-comment': 2,
  }
}
