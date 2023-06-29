import { AddPostRepository } from "@/data/protocols/db";
import { PostSelect } from "@/domain/models";

export const postFormatter = (post: PostSelect): AddPostRepository.Result => ({
  id: post.id,
  title: post.title,
  syntax: post.syntax,
  version: post.version,
  description: post.description,
  postDate: post.postDate,
  application: {
    id: post.fkApplication.id,
    description: post.fkApplication.description
  },
  platform: {
    id: post.fkPlatform.id,
    description: post.fkPlatform.description
  },
  postClassification: post.postHasPostClassification.map(classification => ({
    id: classification.fkPostClassification.id,
    description: classification.fkPostClassification.description
  }))
})
