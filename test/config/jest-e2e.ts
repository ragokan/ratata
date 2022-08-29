/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from "jest";
import { join, resolve } from "path";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: join(resolve(), "test"),
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  globalSetup: join(resolve(), "test", "helpers", "jest-global-setup.ts"),
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "src/(.*)": join(resolve(), "src", "$1"),
    "test/(.*)": join(resolve(), "test", "$1"),
  },
  testSequencer: join(resolve(), "test", "helpers", "test-sequencer.js"),
  globals: {
    "ts-jest": {
      tsconfig: join(resolve(), "tsconfig.json"),
    },
  },
};

export default config;
