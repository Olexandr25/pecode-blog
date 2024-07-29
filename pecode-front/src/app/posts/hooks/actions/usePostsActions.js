import axios from 'axios'

const usePostsActions = () => {
  const submitPost = async postData => {
    try {
      const response = await axios.post('/api/posts', postData)
      return response.data
    } catch (error) {
      console.error(
        'Error creating post:',
        error.response?.data || error.message
      )
      throw error
    }
  }

  const deletePost = async postId => {
    try {
      await axios.delete(`/api/posts/${postId}`)
    } catch (error) {
      console.error(
        'Error deleting post:',
        error.response?.data || error.message
      )
      throw error
    }
  }

  return {
    submitPost,
    deletePost,
  }
}

export default usePostsActions
