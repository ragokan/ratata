import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreatePostCommand } from "./commands/impl/create-post.command";
import { DeletePostCommand } from "./commands/impl/delete-post.command";
import { UpdatePostCommand } from "./commands/impl/update-post.command";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { GetPostsHandler } from "./queries/handlers/get-posts.handler";
import { GetSinglePostHandler } from "./queries/handlers/get-single-post.handler";

const QueryHandlers = [GetPostsHandler, GetSinglePostHandler];
const CommandHandlers = [CreatePostCommand, UpdatePostCommand, DeletePostCommand];
@Module({
  imports: [CqrsModule],
  controllers: [PostController],
  providers: [PostRepository, ...QueryHandlers, ...CommandHandlers],
})
export class PostModule {}
