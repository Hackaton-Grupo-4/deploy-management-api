import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosAdapter implements HttpClient {
  async request<T = unknown> (data: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const response = await axios.request(data)
      return {
        statusCode: response.status,
        body: response.data
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.response
      }
    }
  }
}
