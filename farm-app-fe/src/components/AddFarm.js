import React from 'react'

const AddFarm = (props) => {
  const {
    farm,
    handleAddFarm,
    handleLocationChange,
    handleDatetimeChange,
    handleSensorTypeChange,
    handleValueChange
  } = props

  return(
    <div>
      <form onSubmit={handleAddFarm}>
        <label for="location">Location </label><br />
        <input type="text" value={farm.location} onChange={handleLocationChange} /><br />
        <label for="datetime">Datetime </label><br />
        <input type="datetime-local" value={farm.datetime} onChange={handleDatetimeChange} /><br />
        <label for="sensortype">Sensor type </label><br />
        <input type="text" value={farm.sensorType} onChange={handleSensorTypeChange} /><br />
        <label for="Value">Value </label><br />
        <input type="number" value={farm.value} onChange={handleValueChange} /><br />
        <input type="submit" value="Add farm" />
      </form>
    </div>
  )
}

export default AddFarm