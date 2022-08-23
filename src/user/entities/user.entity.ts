import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, MinLength } from "class-validator";

export class UserEntity {
  id: number;

  @MinLength(3, { message: "İsminiz en az 3 karakter olmalıdır." })
  name: string;

  @IsEmail({}, { message: "E-posta adresi geçerli değil." })
  email: string;

  @ApiProperty({ enum: ["ADMIN", "USER"], default: "USER" })
  role: Role;

  createdAt: Date;
  updatedAt: Date;
}
