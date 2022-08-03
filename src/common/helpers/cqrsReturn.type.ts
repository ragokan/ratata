import { ICommandHandler, IQueryHandler } from "@nestjs/cqrs";

export type HandlerReturns<T extends IQueryHandler | ICommandHandler> = ReturnType<T["execute"]>;
