import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddUser } from '@/main/factories/usecases'
import { UserController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeUserValidation } from './user-validation-factory'

export const makeUserController = (): Controller => {
  const validationComposite = makeUserValidation()
  const userController = new UserController(makeDbAddUser(), validationComposite)
  return makeLogControllerDecorator(userController)
}
