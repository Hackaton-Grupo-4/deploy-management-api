import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/erros'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { RemoteLoadUserByTokenSpy } from '../mocks'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: AuthMiddleware
  loadUserByTokenSpy: RemoteLoadUserByTokenSpy
}

const mockSut = (): SutTypes => {
  const loadUserByTokenSpy = new RemoteLoadUserByTokenSpy()
  const sut = new AuthMiddleware(loadUserByTokenSpy)
  return {
    sut,
    loadUserByTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadUserByToken with correct accessToken', async () => {
    const { sut, loadUserByTokenSpy } = mockSut()
    const accessToken = faker.datatype.uuid()
    await sut.handle({ accessToken })
    expect(loadUserByTokenSpy.token).toBe(accessToken)
  })

  test('Should return 403 if LoadUserByToken returns null', async () => {
    const { sut, loadUserByTokenSpy } = mockSut()
    loadUserByTokenSpy.result = null
    const accessToken = faker.datatype.uuid()
    const httpResponse = await sut.handle({ accessToken })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadUserByToken returns an user', async () => {
    const { sut, loadUserByTokenSpy } = mockSut()
    const accessToken = faker.datatype.uuid()
    const httpResponse = await sut.handle({ accessToken })
    expect(httpResponse).toEqual(ok({
      userId: loadUserByTokenSpy.result?.id
    }))
  })

  test('Should return 500 if LoadUserByToken throws', async () => {
    const { sut, loadUserByTokenSpy } = mockSut()
    jest.spyOn(loadUserByTokenSpy, 'load').mockRejectedValue(new Error())
    const accessToken = faker.datatype.uuid()
    const httpResponse = await sut.handle({ accessToken })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
