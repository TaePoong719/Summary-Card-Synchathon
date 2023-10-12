import axios from 'axios'

const instance = axios.create({
  timeout: 1000,
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
