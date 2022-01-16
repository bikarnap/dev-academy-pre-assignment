const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { init } = require('../models/farm')
const Farm = require('../models/farm')

const api = supertest(app)

const initialFarms = [
  {
    location: 'location 1',
    datetime: new Date().toISOString(),
    sensorType: 'pH',
    value: 4,
  },
  {
    location: 'location 2',
    datetime: new Date().toISOString(),
    sensorType: 'rainFall',
    value: 235,
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

test('a valid farm can be added', async () => {
  const newFarm =  {
    location: 'location 3',
    datetime: new Date().toISOString(),
    sensorType: 'temperature',
    value: -12,
  }

  await api
    .post('/api/farms')
    .send(newFarm)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/farms')

  const locations = res.body.docs.map(farm => farm.location)

  expect(res.body.docs).toHaveLength(initialFarms.length + 1)
  expect(locations).toContain(
    'location 3'
  )
})

test('invalid farm cannot be added', async () => {
  const newFarm = {
    location: 'location 1',
    datetime: new Date().toISOString(),
    sensorType: 'humidity',
    value: 97,
  }

  await api
    .post('/api/farms')
    .send(newFarm)
    .expect(400)

  const res = await api.get('/api/farms')

  expect(res.body.docs).toHaveLength(initialFarms.length)
})

afterAll(() => {
  mongoose.connection.close()
})