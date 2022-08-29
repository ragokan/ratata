/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from "jest";
import { join, resolve } from "path";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: join(resolve(), "src"),
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  globalSetup: join(resolve(), "test", "helpers", "jest-global-setup.ts"),
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "src/(.*)": join(resolve(), "src", "$1"),
    "test/(.*)": join(resolve(), "test", "$1"),
  },
};

export default config;
