import { errorSchema, historySchema, userParamsSchema, userSchema } from './schemas/'

export default {
  user: userSchema,
  history: historySchema,
  userParams: userParamsSchema,
  error: errorSchema
}
