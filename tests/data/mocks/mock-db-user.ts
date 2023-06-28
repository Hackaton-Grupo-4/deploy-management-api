import { AddUserRepository } from '@/data/protocols/db'
import { mockUserModel } from '../../domain/mocks'

export class AddUserRepositorySpy implements AddUserRepository {
  params: AddUserRepository.Params
  result: AddUserRepository.Result = mockUserModel()

  async add (params: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    this.params = params
    return this.result
  }
}
