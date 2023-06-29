import { UpdatePost } from '@/domain/usecases'

export interface UpdatePostRepository {
  update: (postData: UpdatePostRepository.Params, postId: number) => Promise<UpdatePostRepository.Result>
}

export namespace UpdatePostRepository {
  export type Params = UpdatePost.Params
  export type Result = UpdatePost.Result
}
