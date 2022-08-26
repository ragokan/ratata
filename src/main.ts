/// <reference path="./common/types/fastify.d.ts" />
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { kAppName } from "src/common/constants";
import fastifyMultipart from "@fastify/multipart";
import { join, resolve } from "path";
import { DatabaseService } from "src/common/database/database.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ["error", "warn", "debug", "verbose"],
  });
  app.setGlobalPrefix("api");

  // Documents
  const config = new DocumentBuilder()
    .setTitle(kAppName)
    .setDescription(`The documentation of the ${kAppName}!`)
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, { customSiteTitle: kAppName });

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));

  app.enableCors({ origin: "*" });

  // Multipart
  app.register(fastifyMultipart as any, { addToBody: true });
  app.useStaticAssets({ root: join(resolve(), "public") });

  const databaseService = app.get(DatabaseService);
  databaseService.enableShutdownHooks(app);

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT, () => {
    const url = `http://127.0.0.1:${PORT}`;
    console.log(`App listening on ${url}`);
    console.log(`For docs: ${url}/api-docs`);
  });
}
bootstrap();
