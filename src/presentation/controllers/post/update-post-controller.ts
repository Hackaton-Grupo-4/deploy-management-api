import { PostModel } from '@/domain/models'
import { UpdatePost } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdatePostController implements Controller {
  constructor(
    private readonly updatePost: UpdatePost,
    private readonly validation: Validation
  ) { }

  async handle(request: UpdatePostController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const {
        applicationId,
        description,
        platformId,
        postClassificationId,
        postDate,
        syntax,
        title,
        userId,
        version,
        params
      } = request 

      const post = await this.updatePost.update({
        applicationId,
        description,
        platformId,
        postClassificationId,
        postDate,
        syntax,
        title,
        userId,
        version
      }, params.id)

      return ok(post)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace UpdatePostController {
      
  export type Request = Omit<PostModel, 'id'> & {
    params: {
      id: number,
    }
  }
}
