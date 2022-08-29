/* eslint-disable @typescript-eslint/no-var-requires */
require("ts-node/register");
import * as util from "util";
import * as dotenv from "dotenv";
import * as childProcess from "child_process";
import * as bcrypt from "bcrypt";
import { testUserRegisterDto } from "../dto/test-user";
import { PrismaClient } from "@prisma/client";
dotenv.config();

export default async () => {
  const exec = util.promisify(childProcess.exec);
  const testDatabaseUrl = process.env.DATABASE_URL_TEST;
  await exec(`DATABASE_URL=${testDatabaseUrl} npx prisma db push --force-reset && clear`);
  process.env.DATABASE_URL = testDatabaseUrl;
  const prisma = new PrismaClient();
  await prisma.$connect();
  await prisma.user.create({
    data: {
      email: testUserRegisterDto.email,
      name: testUserRegisterDto.name,
      hashedPassword: bcrypt.hashSync(testUserRegisterDto.password, 10),
    },
  });
  await prisma.$disconnect();
};
