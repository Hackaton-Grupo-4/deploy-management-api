import { HttpResponse } from './http'

export interface Controller {
  handle: (request: unknown) => Promise<HttpResponse>
}
