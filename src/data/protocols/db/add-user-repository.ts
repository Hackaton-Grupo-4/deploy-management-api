import { AddUser } from '@/domain/usecases'

export interface AddUserRepository {
  add: (userData: AddUserRepository.Params) => Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = AddUser.Params
  export type Result = AddUser.Result
}
