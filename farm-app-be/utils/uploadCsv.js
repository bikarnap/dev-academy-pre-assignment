const csvtojson = require('csvtojson')
const Farm = require('../models/farm')
const mongoose = require('mongoose')
const config = require('./config')
const validateFarmData = require('./validateFarmData')

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB successfully'))
  .catch(err => console.log(`connection to MongoDB failed\n${err.message}`))

const uploadCsvs = (...csvs) => {
  csvs.map(csv => {
    csvtojson()
      .fromFile(csv)
      .then(farmArray => {
        farmArray.map(farm => {
          if (validateFarmData(farm.sensorType, farm.value)) {
            const newFarm = new Farm({
              location: farm.location,
              datetime: farm.datetime,
              sensorType: farm.sensorType,
              value: farm.value
            })

            newFarm.save()
              // .then(savedFarm => console.log(savedFarm))
              .catch(err => console.log(err.message))
          } else {
            console.log(`Invalid ${farm.sensorType} value - ${farm.value}`)
          }
        })
      })
  })
}
const cmdArguments = process.argv.slice(2)
console.log('arguments', cmdArguments)
const csvs = ['Nooras_farm.csv', 'PartialTech.csv', 'ossi_farm.csv', 'friman_metsola.csv']
if (cmdArguments.length > 0)
  uploadCsvs(...cmdArguments)
else
  uploadCsvs(...csvs)