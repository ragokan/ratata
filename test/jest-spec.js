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
    "src/(.*)": join(resolve(), "src", "$1"),
    "test/(.*)": join(resolve(), "test", "$1"),
  },
  testSequencer: join(resolve(), "test", "test-sequencer.js"),
};
