import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/common/database/database.service";
import { LoginCommand } from "../impl/login.command";
import bcrypt from "bcrypt";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { JwtPayload } from "src/common/guards/jwt-payload.dto";
import { HttpException } from "@nestjs/common";

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
      throw new HttpException(errorMessage, 404);
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      throw new HttpException(errorMessage, 404);
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role } as JwtPayload);

    return {
      token,
      user,
    };
  }
}
