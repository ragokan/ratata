import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { LoginHandler } from "src/auth/commands/handlers/login.handler";
import { RegisterHandler } from "src/auth/commands/handlers/register.handler";
import { LoginCommand } from "src/auth/commands/impl/login.command";
import { RegisterCommand } from "src/auth/commands/impl/register.command";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import { RegisterDto } from "src/auth/dto/register.dto";
import { HandlerReturns } from "src/common/helpers/cqrsReturn.type";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.commandBus.execute<RegisterCommand, HandlerReturns<RegisterHandler>>(
      new RegisterCommand(registerDto)
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.commandBus.execute<LoginCommand, HandlerReturns<LoginHandler>>(
      new LoginCommand(loginDto)
    );
  }
}
