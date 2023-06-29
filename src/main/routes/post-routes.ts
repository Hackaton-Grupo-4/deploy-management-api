import { adaptRoute } from '@/main/adapters'
import {
  makeAddPostController,
  makeDeletePostController,
  makeFindPostController
} from '@/main/factories/controllers'
import { RequestHandler, Router } from 'express'

export default (router: Router): void => {
  router.post('/post', adaptRoute(makeAddPostController()) as RequestHandler)
  router.get('/post/:id', adaptRoute(makeFindPostController()) as RequestHandler)
  router.delete('/post/:id', adaptRoute(makeDeletePostController()) as RequestHandler)
}
