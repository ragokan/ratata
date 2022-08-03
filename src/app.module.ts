import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./common/database/database.module";
import { PostModule } from "./post/post.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./env",
    }),
    DatabaseModule.forRoot(),
    PostModule,
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
