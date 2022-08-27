import { HttpException, HttpStatus } from "@nestjs/common";

export class UnauthorizedException extends HttpException {
  constructor() {
    super("You have to be authorized to do this operation.", HttpStatus.UNAUTHORIZED);
  }
}
