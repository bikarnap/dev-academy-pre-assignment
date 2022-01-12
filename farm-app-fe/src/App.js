import { useEffect, useState } from 'react';
import './App.css';

// components
import FarmTable from './components/FarmTable';

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

  useEffect(() => {
    farmService.getAll()
      .then(returnedFarms => 
        (
          setFarms(farms.concat(returnedFarms.farms.docs))
        )
      )
  }, [])

  return (
    <div className="App">
      <FarmTable farms={farms} />
    </div>
  );
}

export default App;
