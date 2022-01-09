const validateValue = (value, minValue, maxValue) => {
  if (value >= minValue && value <= maxValue)
    return true
  else
    return false
}

const validateFarmData = (sensorType, value) => {
  switch (sensorType.toLowerCase()) {
    case 'temperature':
      validateValue(value, -50, 100)
      break
    case 'rainfall':
      validateValue(value, 0, 500)
      break
    case 'ph':
      validateValue(value, 0.0, 14.0)
      break
    default:
      console.log(`Sensor type '${sensorType}' is not valid`)
      break
  }
}
validateFarmData('heat', 34)
// module.exports = validateFarmData