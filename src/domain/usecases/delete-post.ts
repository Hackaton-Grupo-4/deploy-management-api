import { ApplicationModel, PlatformModel, PostClassificationModel, PostModel } from '@/domain/models'

export interface DeletePost {
  delete: (params: DeletePost.Params) => Promise<DeletePost.Result>
}

export namespace DeletePost {
  export type Params = { id: number }
  export type Result = DeletePostResult | undefined
}

interface DeletePostResult {
  id: number
  title: string
  active: boolean
}