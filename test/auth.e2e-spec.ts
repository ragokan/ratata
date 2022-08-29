import { HttpStatus } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Role } from "@prisma/client";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import * as request from "supertest";
import { testUserLoginDto2, testUserRegisterDto2 } from "test/dto/test-user";
import { setupBeforeAll } from "test/helpers/setup-before-all";

describe("Auth", () => {
  let app: NestFastifyApplication;
  let api: request.SuperTest<request.Test>;

  beforeAll(async () => {
    app = await setupBeforeAll();
    api = request(app.getHttpServer());
  });

  it("POST: Register", async () => {
    const resp = await api
      .post("/auth/register")
      .send(testUserRegisterDto2)
      .expect(HttpStatus.CREATED);
    const body = resp.body as AuthResponseDto;

    expect(body.user.email).toEqual(testUserRegisterDto2.email);
    expect(body.user.name).toEqual(testUserRegisterDto2.name);
    expect(body.user.role).toEqual(Role.USER);
    expect(body).not.toContain("password");
  });

  it("POST: Login", async () => {
    const resp = await api.post("/auth/login").send(testUserLoginDto2).expect(HttpStatus.OK);
    const body = resp.body as AuthResponseDto;

    expect(body.user.email).toEqual(testUserRegisterDto2.email);
    expect(body.user.name).toEqual(testUserRegisterDto2.name);
    expect(body.user.role).toEqual(Role.USER);
    expect(body).not.toContain("password");
  });

  afterAll(async () => await app.close());
});
