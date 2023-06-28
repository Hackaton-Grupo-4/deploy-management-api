import { AddUser } from '@/domain/usecases'
import { UserController } from '@/presentation/controllers'
import { MissingParamError, ServerError } from '@/presentation/erros'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import faker from '@faker-js/faker'
import { mockAddUserParams } from '../../domain/mocks'
import { AddUserSpy, ValidationSpy } from '../mocks'

const mockRequest = (request?: AddUser.Params): UserController.Request => (request ?? mockAddUserParams())

type SutTypes = {
  sut: UserController
  addUserSpy: AddUserSpy
  validationSpy: ValidationSpy
}

const mockSut = (): SutTypes => {
  const addUserSpy = new AddUserSpy()
  const validationSpy = new ValidationSpy()
  const sut = new UserController(addUserSpy, validationSpy)
  return {
    sut,
    addUserSpy,
    validationSpy
  }
}

describe('User Controller', () => {
  test('Should call AddUser with correct values', async () => {
    const { sut, addUserSpy } = mockSut()
    const userParams = mockAddUserParams()
    await sut.handle(mockRequest(userParams))
    expect(addUserSpy.params).toEqual(userParams)
  })

  test('Should return 500 if AddUser throws', async () => {
    const { sut, addUserSpy } = mockSut()
    jest.spyOn(addUserSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addUserSpy } = mockSut()
    const userParams = mockAddUserParams()
    const httpResponse = await sut.handle(mockRequest(userParams))
    expect(httpResponse).toEqual(ok(addUserSpy.result))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = mockSut()
    const request = mockRequest()

    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = mockSut()
    const field = faker.datatype.string()
    validationSpy.error = new MissingParamError(field)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError(field)))
  })
})
