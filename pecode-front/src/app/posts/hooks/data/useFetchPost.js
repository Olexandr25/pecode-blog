'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetchPost = postId => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`)
        setPost(response.data)
      } catch (err) {
        setError('Failed to fetch the post.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (typeof postId === 'string' && postId.trim() !== '') {
      fetchPost()
    } else {
      setLoading(false)
      setError('Invalid postId.')
    }
  }, [postId])

  return { post, loading, error }
}

export default useFetchPost
