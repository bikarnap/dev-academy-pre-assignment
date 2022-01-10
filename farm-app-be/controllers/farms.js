const farmsRouter = require('express').Router()
const Farm = require('../models/farm')

farmsRouter.get('/', (req, res) => {
  const { sensorType } = req.query
  if (sensorType) {
    Farm.find({ sensorType: sensorType })
      .limit(100)
      .then(farms => {
        if (farms.length > 0)
          res.json({ data: farms })
        else
          res.status(404)
            .send({ 
              error: `sensorType=${sensorType} not valid`,
              validSensors: ['temperature', 'rainFall', 'pH']
            })
      })
      .catch(err => console.log(err.message))
  } else {
    Farm.find({})
      .limit(100)
      .then(farms => {
        if (farms.length > 0)
          res.json({ data: farms })
        else
          res.status(404)
            .send({ 
              error: `Data not found`
            })
      })
      .catch(err => console.log(err.message))
  }
})

module.exports = farmsRouter