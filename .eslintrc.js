module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "linebreak-style": ["error", "windows"],
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
    // Set Node.js globals as readonly
    require: "readonly",
    module: "readonly",
    exports: "writable",
    // Add globals for Firebase Cloud Functions
    firebase: true,
    admin: true,
    functions: true,
  },
};
