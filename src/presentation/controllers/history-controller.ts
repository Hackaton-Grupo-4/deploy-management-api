import { LoadHistory } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class HistoryController implements Controller {
  constructor (
    private readonly loadHistory: LoadHistory
  ) {}

  async handle (request: HistoryController.Request): Promise<HttpResponse> {
    try {
      const { 
        skip,
        take,
        application,
        platform
      } = request
      const history = await this.loadHistory.load({skip, take, application, platform})
      return ok(history)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace HistoryController {
  export type Request = {
    skip: number
    take: number
    platform: string
    application: string
  }
}
