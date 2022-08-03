import { ICommand } from "@nestjs/cqrs";
import { CreatePostDto } from "src/post/dto/create-post.dto";

export class CreatePostCommand implements ICommand {
  constructor(readonly dto: CreatePostDto) {}
}
