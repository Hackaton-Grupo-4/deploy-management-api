import { adaptRoute } from '@/main/adapters'
import { makeUserController } from '@/main/factories/controllers'
import { RequestHandler, Router } from 'express'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeUserController()) as RequestHandler)
}
