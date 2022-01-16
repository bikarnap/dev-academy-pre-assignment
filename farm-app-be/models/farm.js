const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const farmSchema = new mongoose.Schema({
  location: String,
  datetime: Date,
  sensorType: {
    type: String,
    enum: ['temperature', 'rainFall', 'pH']
  },
  value: Number,
})

farmSchema.set('toJSON', {
  transform: (document, returnedFarm) => {
    returnedFarm.id = returnedFarm._id.toString()
    delete returnedFarm._id
    delete returnedFarm.__v
  }
})
farmSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Farm', farmSchema)