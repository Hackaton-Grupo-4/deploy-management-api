export type HttpRequest = {
  url: string
  method: Method
  headers?: any
}

export interface HttpClient<R = unknown> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type Method = 'get'

export enum HttpStatusCode {
  success = 200
}

export interface HttpResponse<T = unknown> {
  statusCode: HttpStatusCode
  body?: T
}
