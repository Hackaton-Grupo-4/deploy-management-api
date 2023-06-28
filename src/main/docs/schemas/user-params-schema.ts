export const userParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
  },
  required: ['name']
}
