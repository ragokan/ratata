import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/post/post.repository";
import { GetSinglePostQuery } from "../impl/get-signle-post.query";

@QueryHandler(GetSinglePostQuery)
export class GetSinglePostHandler implements IQueryHandler<GetSinglePostQuery> {
  constructor(private postRepository: PostRepository) {}

  async execute(query: GetSinglePostQuery) {
    return this.postRepository.findOne(query.id);
  }
}
