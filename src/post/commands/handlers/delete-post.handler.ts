import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/post/post.repository";
import { DeletePostCommand } from "../impl/delete-post.command";

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: DeletePostCommand) {
    await this.postRepository.delete(command.id);
    return true;
  }
}
