const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('farms are returned as json', async () => {
  await api
    .get('/api/farms')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('the length of returned farms with limit 15 is 15', async () => {
  const res = await api.get('/api/farms')
  expect(res.body.farms.docs).toHaveLength(15)
})

test('the first farm has location Noora\'s farm', async () => {
  const res = await api.get('/api/farms')
  expect(res.body.farms.docs[0].location).toBe('Noora\'s farm')
})

afterAll(() => {
  mongoose.connection.close()
})