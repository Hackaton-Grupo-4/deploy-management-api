export const userPath = {
  post: {
    tags: ['User'],
    security: [{
      apiKeyAuth: []
    }],
    summary: 'Api para cadastrar um novo usuario',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/userParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/user'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
