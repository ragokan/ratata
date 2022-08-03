import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Post } from "@prisma/client";
import { PostRepository } from "src/post/post.repository";
import { GetPostsQuery } from "../impl/get-posts.query";

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery, Array<Post>> {
  constructor(private postRepository: PostRepository) {}

  async execute(_: GetPostsQuery) {
    return this.postRepository.findMany();
  }
}
