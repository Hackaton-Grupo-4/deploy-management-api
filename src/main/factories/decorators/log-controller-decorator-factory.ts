import { LogPrismaRepository } from '@/infra/db/prisma'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogPrismaRepository(PrismaHelper)
  return new LogControllerDecorator(controller, logErrorRepository)
}
