const farmsRouter = require('express').Router()
const Farm = require('../models/farm')

farmsRouter.get('/', async (req, res) => {
  const { sensorType, page, limit } = req.query
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 100
  }

  if (sensorType) {
    const farms = await Farm.paginate({ sensorType: sensorType }, options)
    if (farms) {
      let nextCursor = null
      if (farms.hasNextPage) {
        nextCursor = `/api/farms?sensorType=${sensorType}&page=${farms.nextPage}&limit=${farms.limit}`
      } else {
        nextCursor = null
      }
      
      if (nextCursor) {
        res.status(200)
        .json({ nextCursor, farms }) 
      } else {
        res.status(200)
        .json(farms) 
      }
     
    }
  } else {
    const farms = await Farm.paginate({}, options)
    if (farms) {
      let nextCursor = `/api/farms?page=${farms.nextPage}&limit=${farms.limit}`
      if (farms.hasNextPage) {
        nextCursor = `/api/farms?page=${farms.nextPage}&limit=${farms.limit}`
      } else {
        nextCursor = null
      }
      
      if (nextCursor) {
        res.status(200)
        .json({ nextCursor, farms }) 
      } else {
        res.status(200)
        .json(farms) 
      }
    }
  }
})

module.exports = farmsRouter