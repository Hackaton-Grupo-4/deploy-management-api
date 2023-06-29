import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbUpdatePost } from '@/main/factories/usecases'
import { UpdatePostController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeUpdatePostValidation } from './'

export const makeUpdatePostController = (): Controller => {
  const validationComposite = makeUpdatePostValidation()
  const postController = new UpdatePostController(makeDbUpdatePost(), validationComposite)
  return makeLogControllerDecorator(postController)
}
