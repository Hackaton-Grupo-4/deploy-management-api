import { UserModel } from '@/domain/models'

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = Omit<UserModel, 'id'>
  export type Result = UserModel
}
