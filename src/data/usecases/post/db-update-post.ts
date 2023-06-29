import { UpdatePostRepository } from '@/data/protocols/db'
import { UpdatePost } from '@/domain/usecases'

export class DbUpdatePost implements UpdatePost {
  constructor(
    private readonly postRepository: UpdatePostRepository
  ) { }

  async update(postData: UpdatePost.Params, postId: number): Promise<UpdatePost.Result> {
    const post = await this.postRepository.update(postData, postId)
    return post
  }
}
