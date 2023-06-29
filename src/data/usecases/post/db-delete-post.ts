import { DeletePostRepository, FindPostRepository } from "@/data/protocols/db"
import { DeletePost } from "@/domain/usecases"


export class DbDeletePost implements DeletePost {
  constructor(
    private readonly postRepository: DeletePostRepository & FindPostRepository
  ) { }

  async delete(params: DeletePost.Params): Promise<DeletePost.Result> {
    const postExists = await this.postRepository.find(params)

    if (!postExists?.id) return

    const post = await this.postRepository.delete({ id: postExists.id })
    return post
  }
}
