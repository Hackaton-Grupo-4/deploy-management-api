import { LoadHistoryRepository } from '@/data/protocols/db'
import { Context } from '@/infra/db/prisma/helpers/context'

export class HistoryRepository implements LoadHistoryRepository {
  constructor (
    private readonly context: Context
  ) {}
    async loadHistory(): Promise<any> {
        return await this.context.prisma.post.findMany()
    }

  async logError (stack: string): Promise<void> {
    await this.context.prisma.errors.create({
      data: { description: stack }
    })
  }
}
