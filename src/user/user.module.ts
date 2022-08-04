import { Module } from "@nestjs/common";
import { GetUserHandler } from "src/user/queries/handler/get-user.handler";
import { UserController } from "./user.controller";

const QueryHandlers = [GetUserHandler];
@Module({
  controllers: [UserController],
  providers: [...QueryHandlers],
})
export class UserModule {}
