module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    // Nest
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Disable
    "no-empty": "off",
    "no-unused-vars": "off",
    "require-await": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-empty-function": "off",

    // Enable
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/no-throw-literal": "error",
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/no-dupe-class-members": "error",
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/no-invalid-this": "error",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-restricted-imports": "error",
    "@typescript-eslint/no-use-before-define": "error",

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["snake_case", "PascalCase"],
        leadingUnderscore: "allow",
      },
    ],
  },
};
