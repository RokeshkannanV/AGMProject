/* eslint-env node */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "quote-props": ["error", "consistent"],
    "object-curly-spacing": ["error", "never"],
    "require-jsdoc": 0, // Disable Google's requirement for JSDoc comments
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {
   // Define 'module' as a global variable
    module: true,
    require: true,
    exports: true,
  },
};
