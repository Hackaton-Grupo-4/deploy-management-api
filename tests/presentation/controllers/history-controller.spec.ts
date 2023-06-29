import { HistoryController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/erros'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { LoadHistorySpy } from '../../data/mocks'

type SutTypes = {
  sut: HistoryController
  loadHistorySpy: LoadHistorySpy
}

const mockSut = (): SutTypes => {
  const loadHistorySpy = new LoadHistorySpy()
  const sut = new HistoryController(loadHistorySpy)
  return {
    sut,
    loadHistorySpy,
  }
}

describe('History Controller', () => {
  test('Should return 500 if LoadHistory throws', async () => {
    const { sut, loadHistorySpy } = mockSut()
    jest.spyOn(loadHistorySpy, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(null)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

})
