const farmsRouter = require('./controllers/farms')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log(`connected to MongoDB successfully`))
  .catch(err => console.log(`connection to MongoDB failed\n${err.message}`))

app.use(middleware.requestLogger)

app.use('/api/farms', farmsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app