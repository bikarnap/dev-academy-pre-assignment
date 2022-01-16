const farmsRouter = require('express').Router()
const Farm = require('../models/farm')
const validateFarmData = require('../utils/validateFarmData')

// Paginate results based on query strings or without query strings
const paginateResults = async (req, res) => {
  let {
    month,
    sensorType,
    page,
    limit
  } = req.query

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 15
  }

  let farms
  let nextCursor = null

  if (month) {
    if (month.length === 1) {
      month = '0' + month
    }
    console.log(month, typeof month)
    farms = await Farm.paginate({}, options)
    farms.docs = farms.docs.filter(
      farm => farm.datetime.toISOString()
        .slice(5, 7)
        .includes(month)
    )
    if (farms && farms.hasNextPage) {
      nextCursor = `/api/farms?month=${month}&page=${farms.nextPage}&limit=${farms.limit}`
    }
  } else if (sensorType) {
    farms = await Farm.paginate({ sensorType: sensorType }, options)
    nextCursor = `/api/farms?sensorType=${sensorType}&page=${farms.nextPage}&limit=${farms.limit}`

  // } else if (sensorType && month) {
  //   farms = await Farm.paginate({ sensorType: sensorType }, options)
  //   farms.docs = farms.docs.filter(
  //     farm => farm.datetime.toISOString()
  //       .slice(5, 7)
  //       .includes(month)
  //   )
  //   if (farms && farms.hasNextPage) {
  //     nextCursor = `/api/farms?month=${month}sensorType=${sensorType}&page=${farms.nextPage}&limit=${farms.limit}`
  //   }

  } else {
    farms = await Farm.paginate({}, options)
    if (farms && farms.hasNextPage) {
      nextCursor = `/api/farms?page=${farms.nextPage}&limit=${farms.limit}`
    }
  }

  if (nextCursor) {
    res.status(200).json({ nextCursor, farms })
  } else if (nextCursor === null) {
    res.status(200).json(farms)
  } else {
    res.status(404).end()
  }
}

// GET
// sensorType query: /api/farms?sensorType={sensorType}[&page={page}&limit={limit}]
// month query: /api/farms?month={month}[&page={page}&limit={limit}]
farmsRouter.get('/', paginateResults)

// GET
// single farm with its id parameter
// /api/farms/:id
farmsRouter.get('/:id', (req, res, next) => {
  Farm.findById(req.params.id)
    .then(farm => {
      if (farm)
        res.json({ farm: farm })
      else
        res.status(404).end()
    })
    .catch(err => {
      next(err)
    })
})

// GET
// Statistics about the farms in in the collection of MongoDB
// Minimum and maximum values of each sensor types
// Total counts of sensor data === total documents in the collection of MongoDB
// Total count of sensor types in the collection of MongoDB
// Average of each sensor type
farmsRouter.get('/statistics', (req, res) => {
  Farm.aggregate([
    {
      $group: {
        _id: {
          sensorType: '$sensorType'
        },
        max: { $max: '$value' },
        min: { $min: '$value' },
        averageValue: { $avg: '$value' },
        sensorCount: { $sum: 1 },
        totalRecords: { $sum: '$sensorType' }
      },
    },
  ], (err, farms) => {
    console.log(err, farms)
    // remap the results
    var minValues = farms.map(farm => {
      // using ES6 to compute property name
      return {
        [farm._id.sensorType]: farm.min
      }
    })

    const maxValues = farms.map(farm => {
      return {
        [farm._id.sensorType]: farm.max
      }
    })

    const averageValues = farms.map(farm => {
      return {
        [farm._id.sensorType]: farm.averageValue
      }
    })

    const sensorCounts = farms.map(farm => {
      return {
        [farm._id.sensorType]: farm.sensorCount
      }
    })

    res.json({
      minValues,
      maxValues,
      averageValues,
      sensorCounts,
    })
  }
  )
})

// POST
// Validate input farm data and save in the MongoDB collection
farmsRouter.post('/', (req, res) => {
  const body = req.body

  if (validateFarmData(body.sensorType, body.value)) {
    const farm = new Farm({
      location: body.location,
      datetime: body.datetime.toString(),
      sensorType: body.sensorType,
      value: body.value
    })

    farm.save()
      .then(savedFarm => {
        res.status(201).json({ savedFarm: savedFarm })
        console.log(savedFarm)
      })
  } else {
    res.status(400).end()
  }
})

// DELETE
// Delete a farm with a given farm id
farmsRouter.delete('/:id', (req, res, next) => {
  Farm.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// PUT
// Update a farm with a given farm id
farmsRouter.put('/:id', (req, res, next) => {
  const body = req.body
  let farmValidation
  if (body.sensorType && body.value) {
    farmValidation = validateFarmData(body.sensorType, body.value)
  }

  if (farmValidation) {
    const farm = {
      location: body.location,
      datetime: body.datetime,
      sensorType: body.sensorType,
      value: body.value
    }

    Farm.findByIdAndUpdate(req.params.id, farm, { new: true })
      .then(updatedFarm => {
        res.json(updatedFarm)
      })
      .catch(err => next(err))
  } else {
    console.log('Invalid farm')
    res.status(400).send({
      error: 'invalid farm data'
    })
  }
})

module.exports = farmsRouter