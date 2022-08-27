import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyRequest } from "fastify";
import { DatabaseService } from "src/common/database/database.service";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { CreatorPayload } from "src/common/guards/creator/creator.types";

@Injectable()
class CreatorGuard implements CanActivate {
  constructor(private reflector: Reflector, private dbService: DatabaseService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const dataId: number = +request.params["id"];

      const userId: JwtPayload["id"] = request.jwtPayload.id;
      const { model, userIdKey = "userId" } = this.reflector.get<CreatorPayload>(
        "creator",
        context.getHandler()
      );

      const data = await (this.dbService[model] as any).findUnique({
        where: { id: dataId },
        select: { [userIdKey]: true },
      });

      if (!data) {
        throw new HttpException(
          `The ${model} you are looking for is not found.`,
          HttpStatus.NOT_FOUND
        );
      }

      if (data[userIdKey] !== userId) {
        throw new HttpException(
          `You are forbidden to ${request.method.toLowerCase()} this ${model}.`,
          HttpStatus.FORBIDDEN
        );
      }

      return true;
    } catch (_) {
      // An error happened, so probably token is not valid.
      throw new HttpException("You are not authorized to do this operation.", HttpStatus.FORBIDDEN);
    }
  }
}

export const CreatorOnly =
  (payload: CreatorPayload): ClassDecorator & MethodDecorator =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (...args: [constructor: Function]) => {
    {
      UseGuards(CreatorGuard)(...args);
      SetMetadata("creator", payload)(...args);
    }
  };
