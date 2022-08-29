import { HttpStatus } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { UnauthorizedException } from "src/common/guards/auth/unauthorized.exception";
import { PostEntity } from "src/post/entities/post.entity";
import * as request from "supertest";
import { testPostDto, testPostDto2 } from "test/dto/test-post";
import { setupBeforeAll } from "test/helpers/setup-before-all";
import { testLoginHelper } from "test/helpers/test-login.helper";

describe("Post", () => {
  let app: NestFastifyApplication;
  let api: request.SuperTest<request.Test>;
  let dto: AuthResponseDto;
  let createdPostId: number;

  beforeAll(async () => {
    app = await setupBeforeAll();
    api = request(app.getHttpServer());
    dto = await testLoginHelper(api);
  });

  it("POST: post - without token", async () => {
    await api.post("/post").expect(HttpStatus.UNAUTHORIZED).expect({
      statusCode: 401,
      message: new UnauthorizedException().message,
    });
  });

  it("POST: post", async () => {
    const resp = await api
      .post("/post")
      .send(testPostDto)
      .auth(dto.token, { type: "bearer" })
      .expect(HttpStatus.CREATED);
    const body = resp.body as PostEntity;
    createdPostId = body.id;

    expect(body.title).toBe(testPostDto.title);
    expect(body.userId).toBe(dto.user.id);
  });

  it("Patch: post", async () => {
    const resp = await api
      .patch(`/post/${createdPostId}`)
      .send(testPostDto2)
      .auth(dto.token, { type: "bearer" })
      .expect(HttpStatus.OK);
    const body = resp.body as PostEntity;

    expect(body.title).toBe(testPostDto2.title);
    expect(body.userId).toBe(dto.user.id);
  });

  it("Delete: post", async () => {
    await api
      .delete(`/post/${createdPostId}`)
      .auth(dto.token, { type: "bearer" })
      .expect(HttpStatus.OK)
      .expect("true");
  });

  afterAll(async () => await app.close());
});
