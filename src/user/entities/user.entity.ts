import { Role } from "@prisma/client";
import { IsEmail, MinLength } from "class-validator";

export class UserEntity {
  id: number;

  @MinLength(3, { message: "İsminiz en az 3 karakter olmalıdır." })
  name: string;

  @IsEmail(null, { message: "E-posta adresi geçerli değil." })
  email: string;

  role: Role;

  createdAt: Date;
  updatedAt: Date;
}
