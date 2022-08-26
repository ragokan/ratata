/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/naming-convention */

const { resolve, join } = require("path");

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
  testSequencer: join(resolve(), "test", "test-sequencer-spec.js"),
};
