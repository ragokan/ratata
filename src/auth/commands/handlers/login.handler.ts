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

    const error_messsage = "E-posta veya şifre yanlış.";
    if (!user) {
      throw new HttpException(error_messsage, 404);
    }

    const is_valid = await bcrypt.compare(password, user.hashed_password);
    if (!is_valid) {
      throw new HttpException(error_messsage, 404);
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role } as JwtPayload);

    return {
      token,
      user,
    };
  }
}
