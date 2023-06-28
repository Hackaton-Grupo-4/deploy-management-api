import { AddUserRepository } from '@/data/protocols/db'
import { AddUser } from '@/domain/usecases'

export class DbAddUser implements AddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository
  ) {}

  async add (userData: AddUser.Params): Promise<AddUser.Result> {
    const user = await this.addUserRepository.add(userData)
    return user
  }
}
