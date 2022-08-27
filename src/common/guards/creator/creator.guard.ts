import { CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyRequest } from "fastify";
import { DatabaseService } from "src/common/database/database.service";
import { JwtPayload } from "src/common/guards/auth/jwt-payload.dto";
import { CreatorException } from "src/common/guards/creator/creator.exception";
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
        throw new CreatorException({ messageBuilder: (messages) => messages.notFound(model) });
      }

      if (data[userIdKey] !== userId) {
        throw new CreatorException({
          messageBuilder: (messages) => messages.notCreator(model, request.method.toLowerCase()),
        });
      }

      return true;
    } catch (_) {
      // An error happened, so probably token is not valid.
      throw new CreatorException({ messageBuilder: (messages) => messages.default });
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
