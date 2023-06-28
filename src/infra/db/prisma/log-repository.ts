import { LogErrorRepository } from '@/data/protocols/db'
import { Context } from '@/infra/db/prisma/helpers/context'

export class LogPrismaRepository implements LogErrorRepository {
  constructor (
    private readonly context: Context
  ) {}

  async logError (stack: string): Promise<void> {
    await this.context.prisma.errors.create({
      data: { description: stack }
    })
  }
}
