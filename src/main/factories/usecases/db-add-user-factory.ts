import { DbAddUser } from '@/data/usecases'
import { DbAddUserRepository } from '@/infra/db/prisma'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

export const makeDbAddUser = (): DbAddUser => {
  const addUserRepository = new DbAddUserRepository(PrismaHelper)
  return new DbAddUser(addUserRepository)
}
