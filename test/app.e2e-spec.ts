import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppService } from "src/app.service";
import * as request from "supertest";
import { setupBeforeAll } from "test/helpers/setup-before-all";

describe("App", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => (app = await setupBeforeAll()));

  it("GET: hello", () => {
    return request(app.getHttpServer()).get("").expect(200).expect(app.get(AppService).getHello());
  });

  afterAll(() => app.close());
});
