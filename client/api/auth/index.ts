import axios from 'axios'

export const authApi = axios.create({
  method: 'POST',
  baseURL: 'http://localhost:5000/auth'
})
    