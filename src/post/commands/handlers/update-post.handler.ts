import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/post/post.repository";
import { UpdatePostCommand } from "../impl/update-post.command";

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: UpdatePostCommand) {
    return this.postRepository.update(command.id, { ...command.dto, userId: command.userId });
  }
}
