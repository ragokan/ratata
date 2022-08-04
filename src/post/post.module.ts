import { Module } from "@nestjs/common";
import { CreatePostHandler } from "src/post/commands/handlers/create-post.handler";
import { DeletePostHandler } from "src/post/commands/handlers/delete-post.handler";
import { UpdatePostHandler } from "src/post/commands/handlers/update-post.handler";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { GetPostsHandler } from "./queries/handlers/get-posts.handler";
import { GetSinglePostHandler } from "./queries/handlers/get-single-post.handler";

const QueryHandlers = [GetPostsHandler, GetSinglePostHandler];
const CommandHandlers = [CreatePostHandler, UpdatePostHandler, DeletePostHandler];
@Module({
  controllers: [PostController],
  providers: [PostRepository, ...QueryHandlers, ...CommandHandlers],
})
export class PostModule {}
