import { PickType } from "@nestjs/swagger";
import { MinLength } from "class-validator";
import { UserEntity } from "src/user/entities/user.entity";

export class RegisterDto extends PickType(UserEntity, ["name", "email"]) {
  @MinLength(6, { message: "Şifreniz en az 6 karakter olmalıdır." })
  password: string;
}
