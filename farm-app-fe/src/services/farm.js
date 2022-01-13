import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/farms'
const getFarms = (page, limit) => {
  const request = axios
    .get(`${baseUrl}?page=${page}&limit=${limit}`)
  return request.then(res => res.data)
}

const farmService = { getFarms }
export default farmService