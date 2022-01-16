const Farm = require('../models/farm')

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

const nonExistingId = async () => {
  const farm = new Farm({
    location: 'location 3',
    datetime: new Date().toISOString(),
    sensorType: 'temperature',
    value: 42,
  })

  await farm.save()
  await farm.remove()

  return farm._id.toStrin()
}

const farmsInDb = async () => {
  const farms = await Farm.find({})
  return farms.map(farm => farm.toJSON())
}

module.exports = {
  initialFarms,
  nonExistingId,
  farmsInDb
}