import { AddPostRepository } from '@/data/protocols/db'
import { AddPost } from '@/domain/usecases'

export class DbAddPost implements AddPost {
  constructor(
    private readonly postRepository: AddPostRepository
  ) { }

  async add(postData: AddPost.Params): Promise<AddPost.Result> {
    const post = await this.postRepository.add(postData)
    return post
  }
}
