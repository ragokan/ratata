import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AppService } from "src/app.service";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

describe("Cats", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET hello`, () => {
    return request(app.getHttpServer()).get("").expect(200).expect(app.get(AppService).getHello());
  });

  afterAll(async () => {
    await app.close();
  });
});
