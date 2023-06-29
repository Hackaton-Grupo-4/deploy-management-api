import app from '@/main/config/app'
import request from 'supertest'

describe('User Routes', () => {
  test('Should return 200 on add user with valid accessToken', async () => {
    await request(app)
      .post('/api/user')
      .send({
        name: 'João Soares',
        role: 'Telemedicina'
      })
      .expect(200)
  })
})
