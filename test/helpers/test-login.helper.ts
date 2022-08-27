import { HttpStatus } from "@nestjs/common";
import { AuthResponseDto } from "src/auth/dto/auth-response.dto";
import { SuperTest, Test } from "supertest";
import { testUserLoginDto } from "test/dto/test-user";

export const testLoginHelper = async (api: SuperTest<Test>) => {
  const resp = await api.post("/auth/login").send(testUserLoginDto).expect(HttpStatus.OK);
  const body = resp.body as AuthResponseDto;
  return body;
};
