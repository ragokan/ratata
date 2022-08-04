import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ApiBearerAuth } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { Role } from "src/common/guards/role.dto";

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const authHeader = request.headers.authorization;
      if (!authHeader.startsWith("Bearer ")) {
        throw new HttpException("You are not authorized men!", 401);
      }

      const role = this.reflector.get<Role>("role", context.getHandler());

      return true;
    } catch (error) {
      return false;
    }
  }
}

export const Auth =
  (role: Role = Role.USER): ClassDecorator & MethodDecorator =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (...args: [constructor: Function]) => {
    {
      UseGuards(AuthGuard)(...args);
      ApiBearerAuth()(...args);
      SetMetadata("role", role);
    }
  };
