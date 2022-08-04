import { ICommand } from "@nestjs/cqrs";
import { RegisterDto } from "src/auth/dto/register.dto";

export class RegisterCommand implements ICommand {
  constructor(readonly dto: RegisterDto) {}
}
