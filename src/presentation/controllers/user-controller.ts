import { UserModel } from '@/domain/models'
import { AddUser } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UserController implements Controller {
  constructor(
    private readonly addUser: AddUser,
    private readonly validation: Validation
  ) { }

  async handle(request: UserController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const { name, role } = request

      const user = await this.addUser.add({
        name, role
      })

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UserController {
  export type Request = Omit<UserModel, 'id'>
}
