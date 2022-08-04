import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/common/database/database.service";
import { RegisterCommand } from "../impl/register.command";
import bcrypt from "bcrypt";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { JwtPayload } from "src/common/guards/jwt-payload.dto";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, AuthResponseDto> {
  constructor(private dbService: DatabaseService, private jwtService: JwtService) {}

  async execute(command: RegisterCommand) {
    const { name, email, password } = command.dto;

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await this.dbService.user.create({
      data: {
        name,
        email,
        hashed_password,
      },
    });

    const token = this.jwtService.sign({ id: user.id, role: user.role } as JwtPayload);

    return {
      token,
      user,
    };
  }
}
