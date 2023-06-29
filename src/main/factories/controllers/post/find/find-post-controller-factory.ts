import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbFindPost } from '@/main/factories/usecases'
import { FindPostController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeFindPostValidation } from './find-post-validation-factory'

export const makeFindPostController = (): Controller => {
  const validationComposite = makeFindPostValidation()
  const postController = new FindPostController(makeDbFindPost(), validationComposite)
  return postController
}
