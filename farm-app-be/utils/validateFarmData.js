const validateValue = (value, minValue, maxValue) => {
  if (value >= minValue && value <= maxValue)
    return true
  else
    return false
}

const validateFarmData = (sensorType, value) => {
  switch (sensorType.toLowerCase()) {
    case 'temperature':
      // validateValue(value, -50, 100)
      if (value >= -50 && value <= 100)
        return true
      else
        return false
    case 'rainfall':
      if (value >= 0 && value <= 500)
        return true
      else
        return false
    case 'ph':
      if (value >= 0.0 && value <= 14.0)
        return true
      else
        return false
    default:
      console.log(`Sensor type '${sensorType}' is not valid`)
      break
  }
}

module.exports = validateFarmData