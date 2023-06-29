import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeletePost } from '@/main/factories/usecases'
import { DeletePostController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDeletePostValidation } from './delete-post-validation-factory'

export const makeDeletePostController = (): Controller => {
  const validationComposite = makeDeletePostValidation()
  const postController = new DeletePostController(makeDbDeletePost(), validationComposite)
  return makeLogControllerDecorator(postController)
}
