import { render, screen } from '@testing-library/react'
import { useFetchPosts } from '../src/app/posts/hooks'
import PostsPage from '../src/app/posts/page'

jest.mock('../src/app/posts/hooks', () => ({
  useFetchPosts: jest.fn(),
}))

describe('PostsPage', () => {
  it('renders loading skeletons when loading', () => {
    useFetchPosts.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    })

    render(<PostsPage />)
    const skeletons = screen.getAllByTestId('post-skeleton-item')
    expect(skeletons).toHaveLength(10)
  })

  it('renders posts when data is available', () => {
    const posts = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' },
      { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' },
    ]

    useFetchPosts.mockReturnValue({
      data: posts,
      loading: false,
      error: null,
    })

    render(<PostsPage />)
    const postTitles = screen.getAllByRole('heading', { level: 2 })
    expect(postTitles).toHaveLength(2)
    expect(postTitles[0]).toHaveTextContent('Post 1')
    expect(postTitles[1]).toHaveTextContent('Post 2')
  })

  it('renders error message when error occurs', () => {
    useFetchPosts.mockReturnValue({
      data: [],
      loading: false,
      error: 'Error loading posts!',
    })

    render(<PostsPage />)
    const errorMessage = screen.getByText('Error loading posts!')
    expect(errorMessage).toBeInTheDocument()
  })
})
