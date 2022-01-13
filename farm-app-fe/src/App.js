import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';

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
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(15)
  const [pagingInfo, setPagingInfo] = useState({})

  useEffect(() => {
    farmService.getFarms(currentPage, limit)
      .then(returnedFarms => 
        (
          setFarms(returnedFarms.farms.docs)
        )
      )
  }, [currentPage, limit])

  useEffect(() => {
    farmService.getPagingInfo()
      .then(info => setPagingInfo(info))
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
  // farmsToRender = farmsToRender.sort((a, b) => a.value - b.value)

  const handleFilterSensorChange = ({ target }) => {
    setFilterSensor(target.value)
  }

  const handleFilterLocationChange = ({ target }) => {
    setFilterLocation(target.value)
  }

  const handleNextButtonClick = () => {
    if (currentPage >= 1 && currentPage < pagingInfo.totalPages)
      setCurrentPage(currentPage + 1)
  }

  const handlePrevButtonClick = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1)
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
      <div>
        Showing {1 + (currentPage * limit) - limit} - {currentPage * limit} of {pagingInfo.totalDocs} farms { ' ' }
        <Button 
          label="<"
          handleClick={handlePrevButtonClick}
        />
        <Button
          label=">"
          handleClick={handleNextButtonClick}
        />
      </div>
    </div>
  );
}

export default App;
