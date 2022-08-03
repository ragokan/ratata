import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "verbose"],
  });
  app.setGlobalPrefix("api");

  const appName = "Ratata";
  // Documents
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription("The documentation of the ratata!")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, { customSiteTitle: "ratata" });

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: "*" });

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT, () => {
    console.log(`App listening on http://127.0.0.1:${PORT}`);
    console.log(`For docs: http://127.0.0.1:${PORT}/api-docs`);
  });
}
bootstrap();
