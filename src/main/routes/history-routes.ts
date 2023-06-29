import { adaptRoute } from '@/main/adapters'
import { makeHistoryController } from '@/main/factories/controllers'
import { RequestHandler, Router } from 'express'

export default (router: Router): void => {
  router.get('/history', adaptRoute(makeHistoryController()) as RequestHandler)
}
