import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/farms'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const farmService = { getAll }

export default farmService