import './App.css';

// components
import FarmTable from './components/FarmTable';

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

  return (
    <div className="App">
      <FarmTable farms={initialFarms} />
    </div>
  );
}

export default App;
