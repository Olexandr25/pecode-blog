'use client'

import { Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { PostSimpleView } from "./_components"

const PostsPage = () => {
  const featuredPosts = [
    {
      id: 100,
      title: 'Featured post',
      author: 'John Doe',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image:
        'https://images.pexels.com/photos/27219316/pexels-photo-27219316/free-photo-of-canon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      imageLabel: 'Image Text',
    },
    {
      id: 101,
      title: 'Post title',
      author: 'Oleksandr V.',
      date: 'Nov 11',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non felis nec justo placerat.
      Integer et nunc nec nulla ultricies. Donec nec nunc nec nulla ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Suspendisse non felis nec justo placerat. Integer et nunc nec nulla ultricies. Donec nec nunc nec nulla ultricies.`,
      image:
        'https://images.pexels.com/photos/24405903/pexels-photo-24405903.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      imageLabel: 'Image Text',
    },
  ]

  const [posts, setPosts] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      )
      console.log(response.data)
      setPosts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {posts.map(post => (
        <PostSimpleView key={post.id} post={post} />
      ))}
    </Box>
  )


}

export default PostsPage
