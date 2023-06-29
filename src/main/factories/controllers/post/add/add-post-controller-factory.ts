import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddPost } from '@/main/factories/usecases'
import { AddPostController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAddPostValidation } from './add-post-validation-factory'

export const makeAddPostController = (): Controller => {
  const validationComposite = makeAddPostValidation()
  const postController = new AddPostController(makeDbAddPost(), validationComposite)
  return makeLogControllerDecorator(postController)
}
