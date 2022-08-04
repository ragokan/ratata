import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { k_app_name } from "src/common/constants";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ["error", "warn", "debug", "verbose"],
  });
  app.setGlobalPrefix("api");

  // Documents
  const config = new DocumentBuilder()
    .setTitle(k_app_name)
    .setDescription(`The documentation of the ${k_app_name}!`)
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, { customSiteTitle: k_app_name });

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: "*" });

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT, () => {
    const url = `http://127.0.0.1:${PORT}`;
    console.log(`App listening on ${url}`);
    console.log(`For docs: ${url}/api-docs`);
  });
}
bootstrap();
