const csvtojson = require('csvtojson')
const Farm = require('../models/farm')

const uploadCsvs = (...csvs) => {
  csvs.map(csv => {
    csvtojson()
      .fromFile(csv)
      .then(farmArray => {
        farmArray.map(farm => {
          const newFarm = new Farm({
            location: farm.location,
            datetime: farm.datetime,
            sensorType: farm.sensorType,
            value: farm.value
          })

          newFarm.save()
            .then(savedFarm => console.log(savedFarm))
            .catch(err => console.log(err.message))
        })
      })
  })
}