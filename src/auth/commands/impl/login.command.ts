import { ICommand } from "@nestjs/cqrs";
import { LoginDto } from "src/auth/dto/login.dto";

export class LoginCommand implements ICommand {
  constructor(readonly dto: LoginDto) {}
}
