import React from 'react'

const FarmTable = ({ farms }) => {
  return(
    <table>
      <thead>
        <tr>
          <th>Location</th>
          <th>Datetime</th>
          <th>Sensor Type</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {farms.map(
            farm => (
              <tr key={farm.id}>
                <td>{farm.location}</td>
                <td>{farm.datetime}</td>
                <td>{farm.sensorType}</td>
                <td>{farm.value}</td>
              </tr>
            )
        )}
      </tbody>
    </table>
  )
}

export default FarmTable