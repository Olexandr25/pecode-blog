import axios from 'axios'

const usePostsActions = () => {
  const submitPost = async postData => {
    try {
      new Throw.error('Error creating post')
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

  return {
    submitPost,
  }
}

export default usePostsActions
