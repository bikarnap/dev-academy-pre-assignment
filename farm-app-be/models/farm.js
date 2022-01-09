const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema({
  location: String,
  datetime: Date,
  sensorType: {
    type: String,
    enum: ['temperature', 'rainFall', 'pH']
  },
  value: Number,    
})

module.exports = mongoose.model('Farm', farmSchema)