import { errorSchema, userParamsSchema, userSchema } from './schemas/'

export default {
  user: userSchema,
  userParams: userParamsSchema,
  error: errorSchema
}
