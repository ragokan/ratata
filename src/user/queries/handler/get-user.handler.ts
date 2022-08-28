import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DatabaseService } from "src/common/database/database.service";
import { UserEntity } from "src/user/entities/user.entity";
import { GetUserQuery } from "../impl/get-user.query";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, UserEntity> {
  constructor(private dbService: DatabaseService) {}

  async execute(query: GetUserQuery) {
    const user = await this.dbService.user.findUnique({ where: { id: query.userId } });

    delete user.hashedPassword;

    return user;
  }
}
