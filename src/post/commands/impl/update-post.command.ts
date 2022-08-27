import { ICommand } from "@nestjs/cqrs";
import { UpdatePostDto } from "src/post/dto/update-post.dto";

export class UpdatePostCommand implements ICommand {
  constructor(readonly id: number, readonly dto: UpdatePostDto, readonly userId: number) {}
}
