export const historyPath = {
    get: {
      tags: ['History'],
      summary: 'Api para carregar todos os itens do historico',
      responses: {
        200: {
          description: 'Sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/schemas/history'
              }
            }
          }
        },
        500: {
          $ref: '#/components/serverError'
        }
      }
    }
  }
  