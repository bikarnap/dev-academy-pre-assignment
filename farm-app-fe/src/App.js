import { useEffect, useState } from 'react';
import './App.css';

// components
import FarmTable from './components/FarmTable';
import Filter from './components/Filter';

// services
import farmService from './services/farm';

function App() {
  const initialFarms = [
    {
      location: 'location 1',
      datetime: new Date().toISOString(),
      sensorType: 'pH',
      value: 4,
      id: 1
    },
    {
      location: 'location 2',
      datetime: new Date().toISOString(),
      sensorType: 'rainFall',
      value: 235,
      id: 2
    }
  ]

  const [farms, setFarms] = useState(initialFarms)
  const [filterSensor, setFilterSensor] = useState('')
  const [filterLocation, setFilterLocation] = useState('')

  useEffect(() => {
    farmService.getAll()
      .then(returnedFarms => 
        (
          setFarms(farms.concat(returnedFarms.farms.docs))
        )
      )
  }, [])

  let farmsToRender = (filterSensor === '')
    ? farms
    : farms.filter(farm => (
      farm.sensorType.toLowerCase().includes(filterSensor.toLowerCase())
    ))
  
  farmsToRender = (filterLocation === '')
    ? farmsToRender
    : farmsToRender.filter(farm => (
      farm.location.toLowerCase().includes(filterLocation.toLowerCase())
    ))



  const handleFilterSensorChange = ({ target }) => {
    setFilterSensor(target.value)
  }

  const handleFilterLocationChange = ({ target }) => {
    setFilterLocation(target.value)
  }

  return (
    <div>
      <div>
        <Filter 
          filter={filterSensor}
          filterType="sensor type"
          handleFilterChange={handleFilterSensorChange}
          placeholder="eg: rainFall"
        />
      </div>
      <div>
        <Filter 
          filter={filterLocation}
          filterType="location"
          handleFilterChange={handleFilterLocationChange}
          placeholder="eg: Noora's farm"
        />
      </div>
      <FarmTable farms={farmsToRender} />
    </div>
  );
}

export default App;
