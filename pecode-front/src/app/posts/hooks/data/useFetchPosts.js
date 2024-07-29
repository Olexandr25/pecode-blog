import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetchPosts = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: response } = await axios.get(
          '/api/posts'
        )
        setData(response)
      } catch (error) {
        console.error('Error message:', error?.message)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export default useFetchPosts
