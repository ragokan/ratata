import { ForbiddenException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { DatabaseService } from "src/common/database/database.service";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { LoginCommand } from "../impl/login.command";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, AuthResponseDto> {
  constructor(private dbService: DatabaseService, private jwtService: JwtService) {}

  async execute(command: LoginCommand) {
    const { email, password } = command.dto;

    const user = await this.dbService.user.findFirst({
      where: { email },
    });

    const errorMessage = "E-posta veya şifre yanlış.";
    if (!user) {
      throw new ForbiddenException(errorMessage);
    }

    const isValid = await compare(password, user.hashedPassword);
    if (!isValid) {
      throw new ForbiddenException(errorMessage);
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    } as JwtPayload);

    delete user.hashedPassword;

    return {
      token,
      user,
    };
  }
}
