const farmsRouter = require('express').Router()

farmsRouter.get('/', (req, res) => {
  res.json({ message: 'farms app backend' })
})

module.exports = farmsRouter