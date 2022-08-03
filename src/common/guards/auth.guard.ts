import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";

@Injectable()
class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      // TODO: Instantiate it.
      throw new HttpException("You are not authorized men!", 401);
    }
    return true;
  }
}

export const Auth =
  (): ClassDecorator & MethodDecorator =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (...args: [constructor: Function]) => {
    {
      UseGuards(AuthGuard)(...args);
      ApiBearerAuth()(...args);
    }
  };
