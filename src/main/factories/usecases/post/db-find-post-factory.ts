import { DbFindPost } from '@/data/usecases'
import { PostRepository } from '@/infra/db/prisma'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

export const makeDbFindPost = (): DbFindPost => {
  const postRepository = new PostRepository(PrismaHelper)
  return new DbFindPost(postRepository)
}
