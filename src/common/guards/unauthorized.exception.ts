import { HttpException, HttpStatus } from "@nestjs/common";

export class UnauthorizedException extends HttpException {
  constructor() {
    super("Bu işlemi yapmak için giriş yapmanız gerekiyor.", HttpStatus.UNAUTHORIZED);
  }
}
