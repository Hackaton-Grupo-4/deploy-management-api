import { LoadHistory } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class HistoryController implements Controller {
  constructor (
    private readonly loadHistory: LoadHistory
  ) {}

  async handle (request: HistoryController.Request): Promise<HttpResponse> {
    try {
      const history = await this.loadHistory.load()
      return ok(history)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace HistoryController {
  export type Request = any
}
