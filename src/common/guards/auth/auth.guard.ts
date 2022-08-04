import { CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { UnauthorizedException } from "src/common/guards/auth/unauthorized.exception";

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const authHeader = request.headers.authorization;

      if (!authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException();
      }
      const token = authHeader.split(" ")[1];

      const payload = this.jwtService.verify<JwtPayload>(token);
      const role = this.reflector.get<Role>("role", context.getHandler());
      console.log({ role });

      if (role === Role.USER || payload.role === Role.ADMIN) {
        request.jwtPayload = payload;
        return true;
      }

      // Somehow user can't access this page.
      throw new UnauthorizedException();
    } catch (_) {
      // An error happened, so probably token is not valid.
      throw new UnauthorizedException();
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
      SetMetadata("role", role)(...args);
    }
  };
