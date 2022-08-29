/* eslint-disable @typescript-eslint/no-var-requires */

import * as util from "util";
import * as dotenv from "dotenv";
import * as request from "supertest";
import * as childProcess from "child_process";
import { setupBeforeAll } from "test/helpers/setup-before-all";
import { testUserRegisterDto } from "test/dto/test-user";
import { HttpStatus } from "@nestjs/common";
dotenv.config();

export default async () => {
  const exec = util.promisify(childProcess.exec);
  const testDatabaseUrl = process.env.DATABASE_URL_TEST;
  await exec(`DATABASE_URL=${testDatabaseUrl} npx prisma db push --force-reset && clear`);
  process.env.DATABASE_URL = testDatabaseUrl;

  const app = await setupBeforeAll();
  await request(app.getHttpServer())
    .post("/auth/register")
    .send(testUserRegisterDto)
    .expect(HttpStatus.CREATED);
  await app.close();
};
