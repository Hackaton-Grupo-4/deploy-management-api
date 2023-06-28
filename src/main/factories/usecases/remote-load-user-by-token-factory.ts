import { RemoteLoadUserByToken } from '@/data/usecases'
import { LoadUserByToken } from '@/domain/usecases'
import { AxiosAdapter } from '@/infra/http'
import env from '@/main/config/env'

export const makeRemoteLoadUserByToken = (): LoadUserByToken => {
  const url = `${String(env.auth)}/sessions/validate`
  const httpClient = new AxiosAdapter()
  return new RemoteLoadUserByToken(url, httpClient)
}
