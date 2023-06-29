import { FindPost } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class FindPostController implements Controller {
  constructor(
    private readonly findPost: FindPost,
    private readonly validation: Validation
  ) { }

  async handle(request: FindPostController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.params)
      if (error) return badRequest(error)

      const post = await this.findPost.find({ id: request.params.id })

      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindPostController {
  export type Request = {
    params: {
      id: number,
    }
  }
}
