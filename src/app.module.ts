import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./common/database/database.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "src/common/redis/redis.module";
import { GlobalModule } from "src/common/global/global.module";
import { FileModule } from "src/common/file/file.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule.forRoot(),
    RedisModule.forRoot(),
    GlobalModule,
    FileModule,
    CqrsModule,
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
