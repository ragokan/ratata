import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { LoginHandler } from "src/auth/commands/handlers/login.handler";
import { RegisterHandler } from "src/auth/commands/handlers/register.handler";
import { ENV } from "src/common/constants";
import { AuthController } from "./auth.controller";

const CommandHandlers = [RegisterHandler, LoginHandler];
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
  providers: [...CommandHandlers],
})
export class AuthModule {}
