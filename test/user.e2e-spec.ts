import { HttpStatus } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Role } from "@prisma/client";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { UnauthorizedException } from "src/common/guards/auth/unauthorized.exception";
import { UserEntity } from "src/user/entities/user.entity";
import * as request from "supertest";
import { testUserRegisterDto } from "test/dto/test-user";
import { setupBeforeAll } from "test/helpers/setup-before-all";
import { testLoginHelper } from "test/helpers/test-login.helper";

describe("Auth", () => {
  let app: NestFastifyApplication;
  let api: request.SuperTest<request.Test>;
  let dto: AuthResponseDto;

  beforeAll(async () => {
    app = await setupBeforeAll();
    api = request(app.getHttpServer());
    dto = await testLoginHelper(api);
  });

  it("GET: Me - without token", async () => {
    await api.get("/user/me").expect(HttpStatus.UNAUTHORIZED).expect({
      statusCode: 401,
      message: new UnauthorizedException().message,
    });
  });

  it("GET: Me", async () => {
    const resp = await api
      .get("/user/me")
      .auth(dto.token, { type: "bearer" })
      .expect(HttpStatus.OK);
    const body = resp.body as UserEntity;

    expect(body.email).toEqual(testUserRegisterDto.email);
    expect(body.name).toEqual(testUserRegisterDto.name);
    expect(body.role).toEqual(Role.USER);
    expect(body).not.toContain("password");
  });

  afterAll(async () => await app.close());
});
