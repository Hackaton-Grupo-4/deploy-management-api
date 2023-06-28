import { adaptRoute } from '@/main/adapters'
import { makeUserController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares/auth'
import { RequestHandler, Router } from 'express'

export default (router: Router): void => {
  router.post('/user', auth as RequestHandler, adaptRoute(makeUserController()) as RequestHandler)
}
