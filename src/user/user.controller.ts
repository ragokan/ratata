import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { UserID } from "src/common/decorators/user-id.decorator";
import { Auth } from "src/common/guards/auth.guard";
import { HandlerReturns } from "src/common/helpers/cqrsReturn.type";
import { GetUserQuery } from "src/user/queries/impl/get-user.query";
import { GetUserHandler } from "src/user/queries/handler/get-user.handler";
import { UserEntity } from "src/user/entities/user.entity";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private queryBus: QueryBus) {}

  @Auth()
  @Get("me")
  async me(@UserID() id: number): Promise<UserEntity> {
    return this.queryBus.execute<GetUserQuery, HandlerReturns<GetUserHandler>>(
      new GetUserQuery(id)
    );
  }
}
