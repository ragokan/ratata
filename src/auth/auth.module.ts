import { Module } from "@nestjs/common";
import { LoginHandler } from "src/auth/commands/handlers/login.handler";
import { RegisterHandler } from "src/auth/commands/handlers/register.handler";
import { AuthController } from "./auth.controller";

const CommandHandlers = [RegisterHandler, LoginHandler];
@Module({
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
