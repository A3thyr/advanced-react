module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    // , "plugin:i18next/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "i18next",
    "react-hooks",
    "aetherys-custom-plugin",
  ],
  rules: {
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    indent: ["off"],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "react/jsx-no-useless-fragment": ["warn"],
    "no-shadow": "off",

    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "react/button-has-type": "off",
    "operator-linebreak": "off",
    "linebreak-style": "off",
    "arrow-body-style": "off",
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "i18next/no-literal-string": [
      "error",
      {
        markupOnly: true,
        ignoreAttribute: [
          "as",
          "data-testid",
          "type",
          "to",
          "fallback",
          "target",
          "justfify",
          "align",
          "direction",
          "gap",
          "role",
        ],
      },
    ],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "react/jsx-curly-brace-presence": "off",
    "max-len": [
      "warn",
      {
        ignoreComments: true,
        code: 200,
      },
    ],
    "comma-dangle": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-param-reassign": "off",
    "no-undef": "off",
    "no-console": "off",
    "no-plusplus": "off",
    // custom plugin
    "aetherys-custom-plugin/path-checker": "error",
    // ?
    "function-paren-newline": "off",
    // правило для фулл лоускиллов, срёт при ключах = индексу в СКЕЛЕТОНАХ :pepeClown:
    "react/no-array-index-key": "off",
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
      rules: {
        "i18next/no-literal-string": "off",
        "max-len": "off",
      },
    },
  ],
};
