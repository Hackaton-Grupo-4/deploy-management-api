import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url: string
  method: string
  headers?: unknown
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.headers = data.headers
    return this.response
  }
}
