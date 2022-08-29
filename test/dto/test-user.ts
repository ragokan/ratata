import { LoginDto } from "src/auth/dto/login.dto";
import { RegisterDto } from "src/auth/dto/register.dto";

export const testUserLoginDto: LoginDto = {
  email: "example-test-email@mail.com",
  password: "example-test-password",
};

export const testUserLoginDto2: LoginDto = {
  email: "example-test-emai-2@mail.com",
  password: "example-test-password-2",
};

export const testUserRegisterDto: RegisterDto = {
  ...testUserLoginDto,
  name: "Example Person",
};

export const testUserRegisterDto2: RegisterDto = {
  ...testUserLoginDto2,
  name: "Example Person 2",
};
