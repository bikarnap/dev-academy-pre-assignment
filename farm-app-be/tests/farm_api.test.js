const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const { init } = require('../models/farm')
const Farm = require('../models/farm')

const api = supertest(app)

beforeEach(async () => {
  await Farm.deleteMany({})
  let farmObject = new Farm(helper.initialFarms[0])
  await farmObject.save()
  farmObject = new Farm(helper.initialFarms[1])
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
  expect(res.body.docs).toHaveLength(helper.initialFarms.length)
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

  const farmsAtEnd = await helper.farmsInDb()//api.get('/api/farms')
  expect(farmsAtEnd).toHaveLength(helper.initialFarms.length + 1)

  const locations = farmsAtEnd.map(farm => farm.location)//res.body.docs.map(farm => farm.location)

  // expect(res.body.docs).toHaveLength(initialFarms.length + 1)
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

  const farmsAtEnd = await helper.farmsInDb()//api.get('/api/farms')

  expect(farmsAtEnd).toHaveLength(helper.initialFarms.length)
})

afterAll(() => {
  mongoose.connection.close()
})