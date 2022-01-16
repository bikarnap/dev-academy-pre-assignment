const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Farm = require('../models/farm')

const api = supertest(app)

const initialFarms = [
  {
    location: 'location 1',
    datetime: new Date().toISOString(),
    sensorType: 'pH',
    value: 4,
    id: 1
  },
  {
    location: 'location 2',
    datetime: new Date().toISOString(),
    sensorType: 'rainFall',
    value: 235,
    id: 2
  }
]

beforeEach(async () => {
  await Farm.deleteMany({})
  let farmObject = new Farm(initialFarms[0])
  await farmObject.save()
  farmObject = new Farm(initialFarms[1])
  await farmObject.save()
})

test('farms are returned as json', async () => {
  await api
    .get('/api/farms')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all farms are returned', async () => {
  const res = await api.get('/api/farms')
  expect(res.body.docs).toHaveLength(initialFarms.length)
})

test('a specific farm is within the returned farms', async () => {
  const res = await api.get('/api/farms')
  const locations = res.body.docs.map(
    farm => farm.location
  )
  expect(locations).toContain(
    'location 1'
  )
})

afterAll(() => {
  mongoose.connection.close()
})