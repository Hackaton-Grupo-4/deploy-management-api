import { HttpRequest, HttpResponse } from '@/data/protocols/http'
import faker from '@faker-js/faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'get',
  headers: {
    Authorization: faker.datatype.uuid()
  }
})

export const mockHttpResponse = (): HttpResponse => ({
  statusCode: faker.datatype.number({ min: 100, max: 500 }),
  body: faker.datatype.json()
})
