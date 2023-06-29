import { DbAddPost } from '@/data/usecases'
import { PostRepository } from '@/infra/db/prisma'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

export const makeDbAddPost = (): DbAddPost => {
  const postRepository = new PostRepository(PrismaHelper)
  return new DbAddPost(postRepository)
}
