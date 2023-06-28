import { makeRemoteLoadUserByToken } from '@/main/factories/usecases'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (): Middleware => {
  const loadUserByToken = makeRemoteLoadUserByToken()
  return new AuthMiddleware(loadUserByToken)
}
