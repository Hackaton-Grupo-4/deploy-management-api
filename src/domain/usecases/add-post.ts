import { ApplicationModel, PlatformModel, PostClassificationModel, PostModel } from '@/domain/models'

export interface AddPost {
  add: (post: AddPost.Params) => Promise<AddPost.Result>
}

export namespace AddPost {
  export type Params = Omit<PostModel, 'id'>
  export type Result = AddPostResult
}

interface AddPostResult extends Partial<PostModel> {
  application: ApplicationModel
  platform: PlatformModel
  postClassification: PostClassificationModel[]
}