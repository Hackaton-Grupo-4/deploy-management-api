import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { LoadUserByToken } from '@/domain/usecases'

export class RemoteLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadUserByToken.Result>
  ) { }

  async load (accessToken: string): Promise<LoadUserByToken.Result> {
    const httpRequest: HttpRequest = {
      url: this.url,
      method: 'get',
      headers: {
        Authorization: accessToken
      }
    }
    const httpResponse: HttpResponse<LoadUserByToken.Result> = await this.httpClient.request(httpRequest)
    if (httpResponse.body && httpResponse.statusCode === 200) {
      return httpResponse.body
    }
    return null
  }
}
