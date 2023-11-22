module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["next", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "no-unused-vars": "warn",
    "prettier/prettier": "error",
  },
  plugins: [
    "prettier", // Add this line
  ],
};
