import { LoginDto } from "src/auth/dto/login.dto";
import { RegisterDto } from "src/auth/dto/register.dto";

export const testUserLoginDto: LoginDto = {
  email: "example-test-email@mail.com",
  password: "example-test-password",
};

export const testUserRegisterDto: RegisterDto = {
  ...testUserLoginDto,
  name: "Example Person",
};
