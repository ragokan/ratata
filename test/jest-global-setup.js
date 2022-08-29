/* eslint-disable @typescript-eslint/no-var-requires */

const util = require("util");
const exec = util.promisify(require("child_process").exec);
require("dotenv").config();

module.exports = async () => {
  const testDatabaseUrl = process.env.DATABASE_URL_TEST;
  await exec(`DATABASE_URL=${testDatabaseUrl} npx prisma db push --force-reset && clear`);
  process.env.DATABASE_URL = testDatabaseUrl;
};
