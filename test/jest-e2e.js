/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/naming-convention */

const { resolve, join } = require("path");

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  maxConcurrency: 1,
  globalSetup: join(resolve(), "test", "jest-global-setup.js"),
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "src/(.*)": join(resolve(), "src", "$1"),
    "test/(.*)": join(resolve(), "test", "$1"),
  },
  testSequencer: join(resolve(), "test", "test-sequencer.js"),
};
