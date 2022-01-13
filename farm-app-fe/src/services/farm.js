import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/farms'
const getFarms = (page, limit) => {
  const request = axios
    .get(`${baseUrl}?page=${page}&limit=${limit}`)
  return request.then(res => res.data)
}

const getPagingInfo = () => {
  const request = axios.get(baseUrl)
  return request.then(res => {
    const farms = res.data.farms
    return ({
      totalDocs: farms.totalDocs,
      totalPages: farms.totalPages,
      // nextPage: farms.nextPage,
      // prevPage: farms.prevPage,
      // hasPrevPage: farms.hasPrevPage,
      // hasNextPage: farms.hasNextPage,
      // page: farms.page,
    })
  })
}

const farmService = { 
  getFarms,
  getPagingInfo
}
export default farmService