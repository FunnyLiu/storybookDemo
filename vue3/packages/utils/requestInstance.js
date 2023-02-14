import axios from 'axios'
const requestInstance = axios.create({
  timeout: 10000,
  headers: { 'X-Custom-Header': 'devopslib' }
})
export {
  requestInstance
}
