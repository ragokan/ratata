import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { ApiConsumes } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { AppFile } from "src/common/types/app-file";

@Injectable()
class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const req = ctx
        .switchToHttp()
        .getRequest<FastifyRequest<{ Body: { file: Array<AppFile> } }>>();

      const body = req.body;

      for (const key in body) {
        const element = body[key];
        if (!Array.isArray(element)) continue;
        const maybeFile: AppFile | object = element.at(0);
        if (!("filename" in maybeFile)) continue;
        body[key] = maybeFile;
      }

      return true;
    } catch (error) {
      throw new BadRequestException("Geçersiz dosya veya dosya formatı.");
    }
  }
}

export const Upload =
  (): ClassDecorator & MethodDecorator =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (...args: [constructor: Function]) => {
    {
      UseGuards(UploadGuard)(...args);
      ApiConsumes("multipart/form-data")(...args);
    }
  };
