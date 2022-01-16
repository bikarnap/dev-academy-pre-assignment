import React from 'react'
import { 
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line
} from 'recharts'

const Chart = ({ data }) => {
  return(
    <div>
      <LineChart width={500} height={500} data={data}>
        <XAxis dataKey="sensorType"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default Chart