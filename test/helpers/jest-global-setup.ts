/* eslint-disable @typescript-eslint/no-var-requires */

import * as util from "util";
import * as dotenv from "dotenv";
import * as childProcess from "child_process";
dotenv.config();

export default async () => {
  const exec = util.promisify(childProcess.exec);
  const testDatabaseUrl = process.env.DATABASE_URL_TEST;
  await exec(`DATABASE_URL=${testDatabaseUrl} npx prisma db push --force-reset && clear`);
  process.env.DATABASE_URL = testDatabaseUrl;
};
