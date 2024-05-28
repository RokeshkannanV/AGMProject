import globals from "globals";
// import pluginJs from "eslint-plugin-eslint";

import pluginReactConfig from "eslint-plugin-react";

import { fixupConfigRules } from "@eslint/compat";

export default {
  ignore: ["Firestoreindex.js", "firebase.js"], // Specify files to ignore here
  overrides: [
    {
      files: ["**/*.js"],
      parserOptions: {
        ecmaVersion: 2021, // or the ECMAScript version your project uses
        sourceType: "module", // or "script" if using CommonJS
      },
      env: {
        browser: true,
        node: true,
      },
      globals: globals.browser,
      plugins: ["@eslint/eslint-plugin"],
      extends: [
        "plugin:@eslint/eslint-plugin/recommended",
        "plugin:react/recommended",
      ],
      rules: fixupConfigRules(pluginReactConfig.recommended),
    },
  ],
};
