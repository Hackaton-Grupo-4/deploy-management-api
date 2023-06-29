import { FindPostRepository } from "@/data/protocols/db"
import { FindPost } from "@/domain/usecases"


export class DbFindPost implements FindPost {
  constructor(
    private readonly postRepository: FindPostRepository
  ) { }

  async find(params: FindPost.Params): Promise<FindPost.Result> {
    const post = await this.postRepository.find(params)
    return post
  }
}
