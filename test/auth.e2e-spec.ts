import { HttpStatus } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Role } from "@prisma/client";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import * as request from "supertest";
import { testUserRegisterDto } from "test/dto/test-user";
import { setupBeforeAll } from "test/helpers/setup-before-all";

describe("Auth", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => (app = await setupBeforeAll()));

  it("POST: Register", async () => {
    const api = request(app.getHttpServer());
    const resp = await api.get("auth/register").expect(HttpStatus.CREATED);
    const body = resp.body as AuthResponseDto;

    expect(body.user.email).toEqual(testUserRegisterDto.email);
    expect(body.user.name).toEqual(testUserRegisterDto.name);
    expect(body.user.role).toEqual(Role.USER);
  });

  afterAll(() => app.close());
});
