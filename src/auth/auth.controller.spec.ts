import { CommandBus } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Role } from "@prisma/client";
import { LoginCommand } from "src/auth/commands/impl/login.command";
import { RegisterCommand } from "src/auth/commands/impl/register.command";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import { RegisterDto } from "src/auth/dto/register.dto";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { setupBeforeAll } from "test/setup-before-all";

describe("AuthController", () => {
  let app: NestFastifyApplication;
  let commandBus: CommandBus;

  beforeAll(async () => {
    app = await setupBeforeAll();
    commandBus = app.get(CommandBus);
  });

  afterAll(() => app?.close());

  const registerDto: RegisterDto = {
    name: "Example Person",
    email: "example-test-email@mail.com",
    password: "example-test-password",
  };

  const loginDto: LoginDto = {
    email: registerDto.email,
    password: registerDto.password,
  };

  describe("register", () => {
    let token: string | undefined;
    let user: UserEntity;

    it("registers", async () => {
      const authResponse = await commandBus.execute<RegisterCommand, AuthResponseDto>(
        new RegisterCommand(registerDto)
      );

      user = authResponse.user;
      token = authResponse.token;

      expect(authResponse).toBeDefined();
      expect(authResponse.token).toBeDefined();
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(registerDto.name);
      expect(user.email).toBe(registerDto.email);
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
        new LoginCommand(loginDto)
      );

      user = loginResponse.user;
      token = loginResponse.token;

      expect(loginResponse).toBeDefined();
      expect(loginResponse.token).toBeDefined();
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(registerDto.name);
      expect(user.email).toBe(registerDto.email);
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
