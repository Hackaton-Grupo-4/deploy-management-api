import { AddUser, LoadUserByToken } from '@/domain/usecases'
import faker from '@faker-js/faker'

export const mockUser = (): LoadUserByToken.Result => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})


export const mockAddUserParams = (): AddUser.Params => ({
  name: faker.name.findName()
})

export const mockUserModel = (): AddUser.Result => Object.assign({}, mockAddUserParams(), { id: faker.datatype.number() })
