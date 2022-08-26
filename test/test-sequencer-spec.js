/* eslint-disable @typescript-eslint/no-var-requires */
const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const authTestIndex = tests.findIndex((test) => test.path.includes("auth"));
    if (authTestIndex === -1) return tests;

    const copyArray = [...tests];

    const element = copyArray[authTestIndex];
    copyArray.splice(authTestIndex, 1);
    copyArray.splice(0, 0, element);
    return copyArray;
  }
}

module.exports = CustomSequencer;
