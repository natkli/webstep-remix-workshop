/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "prettier",
  ],
  env: {},
  plugins: [],
  settings: {
    jest: {
      version: 28,
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
};
