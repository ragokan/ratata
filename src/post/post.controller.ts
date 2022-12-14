import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetPostsQuery } from "./queries/impl/get-posts.query";
import { GetPostsHandler } from "./queries/handlers/get-posts.handler";
import { HandlerReturns } from "src/common/helpers/cqrsReturn.type";
import { CreatePostCommand } from "./commands/impl/create-post.command";
import { CreatePostHandler } from "./commands/handlers/create-post.handler";
import { UpdatePostCommand } from "./commands/impl/update-post.command";
import { UpdatePostHandler } from "./commands/handlers/update-post.handler";
import { DeletePostCommand } from "./commands/impl/delete-post.command";
import { DeletePostHandler } from "./commands/handlers/delete-post.handler";
import { GetSinglePostQuery } from "./queries/impl/get-signle-post.query";
import { GetSinglePostHandler } from "./queries/handlers/get-single-post.handler";
import { PostEntity } from "src/post/entities/post.entity";
import { Auth } from "src/common/guards/auth/auth.guard";
import { CreatorOnly } from "src/common/guards/creator/creator.guard";
import { UserID } from "src/common/decorators/user-id.decorator";

@ApiTags("Post")
@Controller("post")
export class PostController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @HttpCode(HttpStatus.CREATED)
  @Auth("USER")
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UserID() userId: number
  ): Promise<PostEntity> {
    // custom command bus with types
    return this.commandBus.execute<CreatePostCommand, HandlerReturns<CreatePostHandler>>(
      new CreatePostCommand(createPostDto, userId)
    );
  }

  @Get()
  async findAll(): Promise<Array<PostEntity>> {
    return this.queryBus.execute<GetPostsQuery, HandlerReturns<GetPostsHandler>>(
      new GetPostsQuery()
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<PostEntity> {
    return this.queryBus.execute<GetSinglePostQuery, HandlerReturns<GetSinglePostHandler>>(
      new GetSinglePostQuery(id)
    );
  }

  @CreatorOnly({ model: "post" })
  @Auth("USER")
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updatePostDto: UpdatePostDto,
    @UserID() userId: number
  ): Promise<PostEntity> {
    return this.commandBus.execute<UpdatePostCommand, HandlerReturns<UpdatePostHandler>>(
      new UpdatePostCommand(id, updatePostDto, userId)
    );
  }

  @CreatorOnly({ model: "post" })
  @Auth("USER")
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<boolean> {
    return this.commandBus.execute<DeletePostCommand, HandlerReturns<DeletePostHandler>>(
      new DeletePostCommand(id)
    );
  }
}
