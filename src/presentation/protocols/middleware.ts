import { HttpResponse } from './http'

export interface Middleware {
  handle: (request: unknown) => Promise<HttpResponse>
}
