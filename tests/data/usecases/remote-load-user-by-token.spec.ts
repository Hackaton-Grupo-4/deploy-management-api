import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteLoadUserByToken } from '@/data/usecases'
import faker from '@faker-js/faker'
import { mockHttpRequest } from '../../domain/mocks'
import { HttpClientSpy } from '../mocks'

type SutTypes = {
  sut: RemoteLoadUserByToken
  httpClientSpy: HttpClientSpy
}

const mockSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadUserByToken(httpClientSpy.url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadUserByToken Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = mockSut()
    const accessToken = faker.datatype.uuid()
    await sut.load(accessToken)
    const httpRequest = mockHttpRequest()
    expect(httpClientSpy.headers).toEqual({ Authorization: accessToken })
    expect(httpClientSpy.method).toBe(httpRequest.method)
  })

  test('Should return null if HttpClient not returns body', async () => {
    const { sut } = mockSut()
    const user = await sut.load(faker.datatype.uuid())
    expect(user).toBeNull()
  })

  test('Should return an user on success', async () => {
    const { sut, httpClientSpy } = mockSut()
    const httpResponse = {
      statusCode: HttpStatusCode.success,
      body: {
        id: faker.datatype.number(),
        name: faker.name.firstName()
      }
    }
    httpClientSpy.response = httpResponse

    const user = await sut.load(faker.datatype.uuid())
    expect(user).toEqual(httpClientSpy.response.body)
  })

  test('Should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = mockSut()
    jest.spyOn(httpClientSpy, 'request').mockRejectedValue(new Error())
    const httpResponse = sut.load(faker.datatype.uuid())
    await expect(httpResponse).rejects.toThrow()
  })
})
