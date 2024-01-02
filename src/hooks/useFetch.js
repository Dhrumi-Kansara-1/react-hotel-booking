import axios from "../utlis/axios.js"
import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(url) 
        setData(res.data.data)
        setLoading(false)
        setError(false)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [])

  const reFetch = async () => {
    try {
      setLoading(true)
      const res = await axios.get(url)
      setData(res.data.data)
      setLoading(false)
      setError(false)
    } catch (err) {
      setError(err)
    }
  }

  return { loading, data, error, reFetch }
}

export default useFetch
