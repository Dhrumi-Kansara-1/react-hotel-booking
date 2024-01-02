import axios from "axios"

const api = axios.create({
  baseURL: "http://192.168.1.54:8800/api", 
  withCredentials: true,
})

export default api
