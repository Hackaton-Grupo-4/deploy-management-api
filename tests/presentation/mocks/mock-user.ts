import { mockUser } from '@/../tests/domain/mocks/mock-user'
import { AddUser, LoadUserByToken } from '@/domain/usecases'
import { mockUserModel } from '../../domain/mocks'

export class RemoteLoadUserByTokenSpy implements LoadUserByToken {
  token: string
  result: LoadUserByToken.Result = mockUser()
  async load (token: string): Promise<LoadUserByToken.Result> {
    this.token = token
    return this.result
  }
}


export class AddUserSpy implements AddUser {
  params: AddUser.Params
  result: AddUser.Result = mockUserModel()
  async add (user: AddUser.Params): Promise<AddUser.Result> {
    this.params = user
    return this.result
  }
}
