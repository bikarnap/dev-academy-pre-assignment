const validateFarmData = require('../utils/validateFarmData')

describe('validate positive temperatures', () => {
  test('sensor = temperature, value = 100 should return true', () => {
    expect(validateFarmData('temperature', 100)).toBe(true)
  })

  test('sensor = temperature, value = 101 should return false', () => {
    expect(validateFarmData('temperature', 101)).toBe(false)
  })

  test('sensor = temperature, value = 56 should return true', () => {
    expect(validateFarmData('temperature', 56)).toBe(true)
  })

  test('sensor = temperature, value = 134 should return false', () => {
    expect(validateFarmData('temperature', 134)).toBe(false)
  })

  test('sensor = temperature, value = 0 should return true', () => {
    expect(validateFarmData('temperature', 0)).toBe(true)
  })
})

describe('validate negative temperatures', () => {
  test('sensor = temperature, value = -50 should return true', () => {
    expect(validateFarmData('temperature', -50)).toBe(true)
  })

  test('sensor = temperature, value = -55 should return false', () => {
    expect(validateFarmData('temperature', -55)).toBe(false)
  })

  test('sensor = temperature, value = -23 should return true', () => {
    expect(validateFarmData('temperature', -23)).toBe(true)
  })
})

describe('validate positive rainfall', () => {
  test('sensor = rainfall, value = 0 should return true', () => {
    expect(validateFarmData('rainfall', 0)).toBe(true)
  })

  test('sensor = rainfall, value = 500 should return true', () => {
    expect(validateFarmData('rainfall', 500)).toBe(true)
  })

  test('sensor = rainfall, value = 345 should return true', () => {
    expect(validateFarmData('rainfall', 345)).toBe(true)
  })

  test('sensor = rainfall, value = 506 should return false', () => {
    expect(validateFarmData('rainfall', 506)).toBe(false)
  })
})

describe('validate negative rainfall', () => {
  test('sensor = rainfall, value = -1 should return false', () => {
    expect(validateFarmData('rainfall', -1)).toBe(false)
  })

  test('sensor = rainfall, value = -100 should return false', () => {
    expect(validateFarmData('rainfall', -100)).toBe(false)
  })
})

describe('validate pH', () => {
  test('sensor = pH, value = 0 should return true', () => {
    expect(validateFarmData('pH', 0)).toBe(true)
  })

  test('sensor = pH, value = 14 should return true', () => {
    expect(validateFarmData('pH', 14)).toBe(true)
  })

  test('sensor = pH, value = 7.25 should return true', () => {
    expect(validateFarmData('pH', 7.25)).toBe(true)
  })

  test('sensor = pH, value = 15.5 should return false', () => {
    expect(validateFarmData('pH', 15.5)).toBe(false)
  })

  test('sensor = pH, value = -1.5 should return false', () => {
    expect(validateFarmData('pH', -1.5)).toBe(false)
  })
})

describe('Invalid sensor type', () => {
  test('light should return false', () => {
    expect(validateFarmData('light', 200)).toBe(false)
  })

  test('oxygen level should return false', () => {
    expect(validateFarmData('oxygen level', 45)).toBe(false)
  })

  test('random_sensor should return false', () => {
    expect(validateFarmData('random_sensor', 11.5)).toBe(false)
  })
})

