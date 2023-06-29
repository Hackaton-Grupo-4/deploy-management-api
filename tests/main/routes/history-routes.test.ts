import app from '@/main/config/app'
import request from 'supertest'

describe('History Routes', () => {
  test('Should return 200 on load history', async () => {
    await request(app)
      .get('/api/history')
      .expect(200)
  })
})
