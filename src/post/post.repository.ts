import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/common/database/database.service";
import { UserIdDto } from "src/common/dto/user-id.dto";
import { BaseRepository } from "src/common/repository/base.repository";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostEntity } from "./entities/post.entity";

@Injectable()
export class PostRepository extends BaseRepository<
  PostEntity,
  CreatePostDto & UserIdDto,
  UpdatePostDto & UserIdDto
> {
  constructor(protected readonly dbService: DatabaseService) {
    super(dbService.post);
  }
}
