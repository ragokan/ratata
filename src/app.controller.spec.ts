import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { setupBeforeAll } from "test/helpers/setup-before-all";
import { AppController } from "./app.controller";

describe("AppController", () => {
  let app: NestFastifyApplication;
  let appController: AppController;

  beforeAll(async () => {
    app = await setupBeforeAll();
    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => await app?.close());

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toEqual({
        message: "Hello World!",
      });
    });
  });
});
