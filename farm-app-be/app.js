const farmsRouter = require('./controllers/farms')
const express = require('express')
const app = express()

app.use('/api/farms', farmsRouter)

module.exports = app