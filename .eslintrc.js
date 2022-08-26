module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "@darraghor/nestjs-typed"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:@darraghor/nestjs-typed/recommended"],
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
    "@darraghor/nestjs-typed/api-method-should-specify-api-response": "off",
    "@darraghor/nestjs-typed/all-properties-are-whitelisted": "off",

    // Disable
    "no-empty": "off",
    "no-unused-vars": "off",
    "require-await": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/triple-slash-reference": "off",

    // Enable
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "off",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/no-throw-literal": "error",
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/no-dupe-class-members": "error",
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/no-invalid-this": "error",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-restricted-imports": "error",
    "@typescript-eslint/no-use-before-define": "error",

    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
    ],
  },
};
