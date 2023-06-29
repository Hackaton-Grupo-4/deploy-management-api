import { LoadHistoryRepository } from '@/data/protocols/db'
import { Context } from '@/infra/db/prisma/helpers/context'

export class HistoryRepository implements LoadHistoryRepository {
  constructor (
    private readonly context: Context
  ) {}
    async loadHistory(filters: LoadHistoryRepository.Params): Promise<LoadHistoryRepository.Result> {
      const total = await this.context.prisma.post.count()
        const results = await this.context.prisma.post.findMany({
          include: {
            fkApplication: {
              select: {
                id: true,
                description: true
              }
            },
            fkUser: {
              select: {
                id: true,
                name: true,
                role: true
              }
            },
            fkPlatform: {
              select: {
                description: true,
                id: true
              }
            },
            postHasPostClassification: {
              select: {
                fkPostClassification: {
                  select: {
                    description: true,
                    id: true
                  }
                }
              }
            }
          },
          skip: Number(filters.skip) ?? 0,
          take: Number(filters.take) ?? 4
        })
        return {
          results,
          totalCount: total,
          totalPages: Math.ceil(total / filters.take)
        }
    }
}
