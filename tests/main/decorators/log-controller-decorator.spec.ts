import { LogErrorRepositorySpy } from '../../data/mocks'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import faker from '@faker-js/faker'
import { LogControllerDecorator } from '../../../src/main/decorators/log-controller-decorator'

export class ControllerSpy implements Controller {
  request: unknown
  httpResponse = ok({ name: 'Maria' })
  async handle (request: unknown): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

const mockServerError = (stack: string): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = stack
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const mockSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = mockSut()
    const request = faker.datatype.json()

    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = mockSut()
    const request = faker.datatype.json()

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({
      name: 'Maria'
    }))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error ', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = mockSut()
    const stack = faker.datatype.string()
    controllerSpy.httpResponse = mockServerError(stack)
    const request = faker.datatype.json()

    await sut.handle(request)
    expect(logErrorRepositorySpy.stack).toBe(stack)
  })
})
