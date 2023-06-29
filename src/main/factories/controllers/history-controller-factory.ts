import { DbLoadHistory } from "@/data/usecases"
import { HistoryRepository } from "@/infra/db/prisma"
import { PrismaHelper } from "@/infra/db/prisma/helpers/prisma-helper"
import { HistoryController } from "@/presentation/controllers"
import { Controller } from '@/presentation/protocols'

export const makeHistoryController = (): Controller => {
    const historyRepository = new HistoryRepository(PrismaHelper)
    const dbLoadHistory = new DbLoadHistory(historyRepository)
    return new HistoryController(dbLoadHistory)
}