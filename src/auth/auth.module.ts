import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ENV } from "src/common/constants";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENV.JWT_SECRET),
        signOptions: { expiresIn: configService.get<string>(ENV.JWT_EXPIRE) },
      }),
    }),
    CqrsModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
