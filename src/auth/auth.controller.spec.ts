import { CommandBus } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Role } from "@prisma/client";
import { LoginCommand } from "src/auth/commands/impl/login.command";
import { RegisterCommand } from "src/auth/commands/impl/register.command";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { setupBeforeAll } from "test/helpers/setup-before-all";
import { testUserLoginDto, testUserRegisterDto } from "test/dto/test-user";

describe("AuthController", () => {
  let app: NestFastifyApplication;
  let commandBus: CommandBus;

  beforeAll(async () => {
    app = await setupBeforeAll();
    commandBus = app.get(CommandBus);
  });

  afterAll(async () => await app?.close());

  describe("register", () => {
    let token: string | undefined;
    let user: UserEntity;

    it("registers", async () => {
      const authResponse = await commandBus.execute<RegisterCommand, AuthResponseDto>(
        new RegisterCommand(testUserRegisterDto)
      );

      user = authResponse.user;
      token = authResponse.token;

      expect(authResponse).toBeDefined();
      expect(authResponse.token).toBeDefined();
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(testUserRegisterDto.name);
      expect(user.email).toBe(testUserRegisterDto.email);
      expect(user.role).toBe(Role.USER);
    });

    it("validates the token", () => {
      expect(token).toBeDefined();
      const decoded = app.get(JwtService).verify<JwtPayload>(token);
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(user.id);
      expect(decoded.role).toBe(user.role);
    });
  });

  describe("login", () => {
    let token: string | undefined;
    let user: UserEntity;

    it("logins", async () => {
      const loginResponse = await commandBus.execute<LoginCommand, AuthResponseDto>(
        new LoginCommand(testUserLoginDto)
      );

      user = loginResponse.user;
      token = loginResponse.token;

      expect(loginResponse).toBeDefined();
      expect(loginResponse.token).toBeDefined();
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(testUserRegisterDto.name);
      expect(user.email).toBe(testUserRegisterDto.email);
      expect(user.role).toBe(Role.USER);
    });

    it("validates the token", () => {
      expect(token).toBeDefined();
      const decoded = app.get(JwtService).verify<JwtPayload>(token);
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(user.id);
      expect(decoded.role).toBe(user.role);
    });
  });
});
