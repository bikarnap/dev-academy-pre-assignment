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
        <input type="text" value={farm.location} onChange={handleLocationChange} />
        <input type="datetime-local" value={farm.datetime} onChange={handleDatetimeChange} />
        <input type="text" value={farm.sensorType} onChange={handleSensorTypeChange} />
        <input type="number" value={farm.value} onChange={handleValueChange} />
        <input type="submit" value="Add farm" />
      </form>
    </div>
  )
}

export default AddFarm