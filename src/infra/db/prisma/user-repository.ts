import { AddUserRepository } from '@/data/protocols/db'
import { Context } from '@/infra/db/prisma/helpers/context'

export class DbAddUserRepository implements AddUserRepository {
  constructor (
    private readonly context: Context
  ) {}

  async add (userData: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const user = await this.context.prisma.user.create({
      data: userData
    })
    return user
  }
}
