import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/post/post.repository";
import { GetSinglePostQuery } from "../impl/get-signle-post.query";

@QueryHandler(GetSinglePostQuery)
export class GetSinglePostHandler implements IQueryHandler<GetSinglePostQuery> {
  constructor(private postRepository: PostRepository) {}

  async execute(query: GetSinglePostQuery) {
    const post = await this.postRepository.findOne(query.id);
    if (!post) {
      throw new NotFoundException("The post you are looking for is not found.");
    }
    return post;
  }
}
