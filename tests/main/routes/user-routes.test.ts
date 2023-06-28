import app from '@/main/config/app'
import env from '@/main/config/env'
import request from 'supertest'

describe('User Routes', () => {
  test('Should return 403 on add user without accessToken', async () => {
    await request(app)
      .post('/api/user')
      .send({
        name: 'João Soares',
      })
      .expect(403)
  })

  test('Should return 200 on add user with valid accessToken', async () => {
    await request(app)
      .post('/api/user')
      .set('x-access-token', env.accessToken ?? '')
      .send({
        name: 'João Soares',
      })
      .expect(200)
  })
})
