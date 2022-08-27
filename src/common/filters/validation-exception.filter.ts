import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();

    const { message: rawMessage } = exception.getResponse() as {
      message: string[];
    };

    response.status(status).send({
      message:
        rawMessage && Array.isArray(rawMessage) && rawMessage.length > 0
          ? rawMessage[0]
          : rawMessage,
    });
  }
}
