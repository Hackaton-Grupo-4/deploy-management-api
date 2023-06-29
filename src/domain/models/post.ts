import { ApplicationModel } from "./application"
import { PlatformModel } from "./platform"
import { PostClassificationModel } from "./post-classification"

export type PostModel = {
  id: number
  title: string
  version: string
  syntax: string
  description: string
  postDate: Date
  applicationId: number
  platformId: number
  postClassificationId: number[]
  userId: number
}

export interface PostSelect extends Partial<PostModel> {
  fkApplication: ApplicationModel
  fkPlatform: PlatformModel
  postHasPostClassification: Array<{
    fkPostClassification: PostClassificationModel
  }>
}
