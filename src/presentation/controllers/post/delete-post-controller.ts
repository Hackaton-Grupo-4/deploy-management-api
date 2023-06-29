import { DeletePost } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/erros'
import { badRequest, ok, notFound, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class DeletePostController implements Controller {
  constructor(
    private readonly deletePost: DeletePost,
    private readonly validation: Validation
  ) { }

  async handle(request: DeletePostController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.params)
      if (error) return badRequest(error)

      const post = await this.deletePost.delete({ id: request.params.id })

      if (!post) return notFound(new NotFoundError('Post'))

      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeletePostController {
  export type Request = {
    params: {
      id: number,
    }
  }
}
