import { DbAddUser } from '@/data/usecases'
import { mockAddUserParams } from '../../domain/mocks'
import { AddUserRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbAddUser
  addUserRepositorySpy: AddUserRepositorySpy
}

const mockSut = (): SutTypes => {
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const sut = new DbAddUser(addUserRepositorySpy)
  return {
    sut,
    addUserRepositorySpy
  }
}

describe('DbAddUser Usecase', () => {
  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositorySpy } = mockSut()
    const userData = mockAddUserParams()

    await sut.add(userData)
    expect(addUserRepositorySpy.params).toEqual(userData)
  })

  test('Should throw if AddUserRepository throws', async () => {
    const { sut, addUserRepositorySpy } = mockSut()
    jest.spyOn(addUserRepositorySpy, 'add').mockRejectedValue(new Error())
    const accountData = mockAddUserParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut, addUserRepositorySpy } = mockSut()

    const userData = mockAddUserParams()

    const user = await sut.add(userData)
    expect(user).toEqual(addUserRepositorySpy.result)
  })
})
