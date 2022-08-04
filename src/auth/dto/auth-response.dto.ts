import { UserEntity } from "src/user/entities/user.entity";

export class AuthResponseDto {
  user: UserEntity;
  token: string;
}
