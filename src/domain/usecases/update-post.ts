import { ApplicationModel, PlatformModel, PostClassificationModel, PostModel } from '@/domain/models'

export interface UpdatePost {
  update: (post: UpdatePost.Params, postId: number) => Promise<UpdatePost.Result>
}

export namespace UpdatePost {
  export type Params = Omit<PostModel, 'id'>
  export type Result = UpdatePostResult
}

interface UpdatePostResult extends Partial<PostModel> {
  application: ApplicationModel
  platform: PlatformModel
  postClassification: PostClassificationModel[]
}