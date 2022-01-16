import { useEffect, useState } from 'react';
import './App.css';
import AddFarm from './components/AddFarm';
import Button from './components/Button';
import Chart from './components/Chart';

// components
import FarmTable from './components/FarmTable';
import Filter from './components/Filter';

// services
import farmService from './services/farm';

function App() {
  const [farms, setFarms] = useState([])
  const [filterSensor, setFilterSensor] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(20)
  const [message, setMessage] = useState('')
  const [pagingInfo, setPagingInfo] = useState({})
  const [farm, setFarm] = useState({
    location: '',
    datetime: '',
    sensorType: '',
    value: ''
  })

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
  
  farmsToRender = farmsToRender.sort((a, b) => a.datetime.slice(5, 7) - b.datetime.slice(5,7))

  const handleFilterSensorChange = ({ target }) => {
    setFilterSensor(target.value)
  }

  const handleNextButtonClick = () => {
    if (currentPage >= 1 && currentPage < pagingInfo.totalPages)
      setCurrentPage(currentPage + 1)
  }

  const handlePrevButtonClick = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1)
  }

  const addFarm = (event) => {
    event.preventDefault()
    const farmObject = {
      location: farm.location,
      datetime: farm.datetime,
      sensorType: farm.sensorType,
      value: farm.value
    }
    farmService.create(farmObject)
      .then(returnedFarm => {
        setFarm(farms.concat(returnedFarm))
        setFarm({})
        setMessage('Farm added')
        setInterval(() => setMessage(''), 5000)
      })
      .catch(err => {
        setMessage('Farm could not be added')
        setInterval(() => setMessage(''), 5000)
      })
  }

  return (
    <div>
      <div className="filter">
        <Filter 
          filter={filterSensor}
          filterType="sensor type"
          handleFilterChange={handleFilterSensorChange}
          placeholder="eg: rainFall"
        /> 
      </div>
      <div className="farm-table">
        <FarmTable farms={farmsToRender} />
        <div className="showing">
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
      <div className="farm-chart">
        <Chart data={farmsToRender} />
      </div>
      <div className="add-farm">
        <h4>Add a farm</h4>
        <br />
        <AddFarm
          farm={farm}
          handleAddFarm={addFarm}
          handleLocationChange={(e) => setFarm({...farm, location: e.target.value}) }
          handleDatetimeChange={(e) => setFarm({...farm, datetime: new Date(e.target.value).toISOString()}) }
          handleSensorTypeChange={(e) => setFarm({...farm, sensorType: e.target.value}) }
          handleValueChange={(e) => setFarm({...farm, value: e.target.value}) }
        />
        <strong>{message}</strong>
      </div>
      {/* <div>
        <Filter 
          filter={filterSensor}
          filterType="sensor type"
          handleFilterChange={handleFilterSensorChange}
          placeholder="eg: rainFall"
        />
      </div>
      <div className="farm-table">
        <FarmTable farms={farmsToRender} />
      </div>
      <div className="farm-chart">
        <Chart data={farmsToRender} />
      </div>
      
      <AddFarm
          farm={farm}
          handleAddFarm={(e) => {e.preventDefault()
          console.log(farm)}}
          handleLocationChange={(e) => setFarm({...farm, location: e.target.value}) }
          handleDatetimeChange={(e) => setFarm({...farm, datetime: new Date(e.target.value).toISOString()}) }
          handleSensorTypeChange={(e) => setFarm({...farm, sensorType: e.target.value}) }
          handleValueChange={(e) => setFarm({...farm, value: e.target.value}) }
        />
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

        
      </div> */}
    </div>
  );
}

export default App;
