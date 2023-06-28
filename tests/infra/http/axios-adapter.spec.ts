import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpResponse } from '@/data/protocols/http'
import { mockHttpRequest } from '../../domain/mocks'
import { AxiosAdapter } from '@/infra/http/axios-adapter'

jest.mock('axios', () => ({
  async request (config: AxiosRequestConfig): Promise<AxiosResponse> {
    const axiosResponse: AxiosResponse = {
      status: 200,
      statusText: 'ok',
      headers: {},
      config: {},
      data: {
        value: 'any_value'
      }
    }
    return await new Promise<AxiosResponse>(resolve =>
      resolve(axiosResponse)
    )
  }
}))

type SutTypes = {
  sut: AxiosAdapter
}

const mockSut = (): SutTypes => {
  const sut = new AxiosAdapter()

  return {
    sut
  }
}

describe('AxiosAdapter', () => {
  test('Should call request with correct values', async () => {
    const { sut } = mockSut()
    const requestSpy = jest.spyOn(axios, 'request')
    const httpRequest = mockHttpRequest()
    await sut.request(httpRequest)
    expect(requestSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return a response if request success', async () => {
    const { sut } = mockSut()
    const response: HttpResponse = await sut.request(mockHttpRequest())
    expect(response).toEqual({
      statusCode: 200,
      body: {
        value: 'any_value'
      }
    })
  })

  test('Should return a response if request throws', async () => {
    const { sut } = mockSut()
    jest.spyOn(axios, 'request').mockRejectedValue({
      response: new Error()
    })

    const response: HttpResponse = await sut.request(mockHttpRequest())
    expect(response).toEqual({
      statusCode: 500,
      body: new Error()
    })
  })
})
