import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { LoginCommand } from "src/auth/commands/impl/login.command";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { GetUserQuery } from "src/user/queries/impl/get-user.query";
import { setupBeforeAll } from "test/setup-before-all";
import { testUserLoginDto } from "test/test-user";

describe("UserController", () => {
  let app: NestFastifyApplication;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeAll(async () => {
    app = await setupBeforeAll();
    commandBus = app.get(CommandBus);
    queryBus = app.get(QueryBus);
  });

  afterAll(() => app?.close());

  let user: UserEntity;
  it("logins", async () => {
    const loginResponse = await commandBus.execute<LoginCommand, AuthResponseDto>(
      new LoginCommand(testUserLoginDto)
    );

    user = loginResponse.user;
  });

  describe("check user", () => {
    it("gets user", async () => {
      expect(user).toBeDefined();

      const userResponse = await queryBus.execute<GetUserQuery, UserEntity>(
        new GetUserQuery(user.id)
      );

      expect(userResponse).toBeDefined();
      expect(userResponse.id).toBe(user.id);
      expect(userResponse.name).toBe(user.name);
      expect(userResponse.email).toBe(user.email);
      expect(userResponse.role).toBe(user.role);
    });
  });
});
