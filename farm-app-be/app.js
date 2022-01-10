const farmsRouter = require('./controllers/farms')
const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log(`connected to MongoDB successfully`))
  .catch(err => console.log(`connection to MongoDB failed\n${err.message}`))

app.use('/api/farms', farmsRouter)

module.exports = app