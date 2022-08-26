/* eslint-disable @typescript-eslint/naming-convention */

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../src",
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/../src/$1",
    "test/(.*)": "<rootDir>/../test/$1",
  },
};
