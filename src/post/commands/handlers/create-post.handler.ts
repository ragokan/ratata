import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/post/post.repository";
import { CreatePostCommand } from "../impl/create-post.command";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: CreatePostCommand) {
    return this.postRepository.create({
      ...command.dto,
      userId: command.userId,
    });
  }
}
