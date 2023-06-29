import { DbUpdatePost } from '@/data/usecases'
import { PostRepository } from '@/infra/db/prisma'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

export const makeDbUpdatePost = (): DbUpdatePost => {
  const postRepository = new PostRepository(PrismaHelper)
  return new DbUpdatePost(postRepository)
}
