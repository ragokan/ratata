import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/common/database/database.service";
import { RegisterCommand } from "../impl/register.command";
import { hash } from "bcrypt";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, AuthResponseDto> {
  constructor(private dbService: DatabaseService, private jwtService: JwtService) {}

  async execute(command: RegisterCommand) {
    const { name, email, password } = command.dto;

    const hashedPassword = await hash(password, 10);

    const userCheck = await this.dbService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (userCheck) {
      throw new BadRequestException("User already exists");
    }

    const user = await this.dbService.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    const token = this.jwtService.sign({ id: user.id, role: user.role } as JwtPayload);

    return {
      token,
      user,
    };
  }
}
