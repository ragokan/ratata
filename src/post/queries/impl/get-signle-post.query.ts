import { IQuery } from "@nestjs/cqrs";

export class GetSinglePostQuery implements IQuery {
  constructor(readonly id: number) {}
}
