export default {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
    
    // Add functions environment for Firebase Cloud Functions
    functions: true,
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
  },
};