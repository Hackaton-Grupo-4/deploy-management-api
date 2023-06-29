import { PostModel } from '@/domain/models'
import { AddPost } from '@/domain/usecases'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddPostController implements Controller {
  constructor(
    private readonly addPost: AddPost,
    private readonly validation: Validation
  ) { }

  async handle(request: AddPostController.Request): Promise<HttpResponse> {
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
        version
      } = request

      const post = await this.addPost.add({
        applicationId,
        description,
        platformId,
        postClassificationId,
        postDate,
        syntax,
        title,
        userId,
        version
      })

      return created(post)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPostController {
  export type Request = Omit<PostModel, 'id'>
}
