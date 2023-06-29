import { ApplicationModel, PlatformModel, PostClassificationModel, PostModel } from '@/domain/models'

export interface FindPost {
  find: (params: FindPost.Params) => Promise<FindPost.Result>
}

export namespace FindPost {
  export type Params = { id: number }
  export type Result = FindPostResult | undefined
}

interface FindPostResult extends Partial<PostModel> {
  application: ApplicationModel
  platform: PlatformModel
  postClassification: PostClassificationModel[]
}