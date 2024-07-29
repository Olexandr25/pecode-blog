import { render, screen, waitFor } from '@testing-library/react'
import { useFetchPosts } from '../src/app/posts/hooks'
import PostsPage from '../src/app/posts/page'

jest.mock('../src/app/posts/hooks')

describe('PostsPage', () => {
  it('renders error message when error occurs', () => {
    useFetchPosts.mockReturnValue({
      data: [],
      loading: false,
      error: 'Error loading posts!',
    })

    render(<PostsPage />)

    waitFor(() => {
      const errorSnackbarMessage = screen.getByText(/Error loading posts!/i)
      expect(errorSnackbarMessage).toBeInTheDocument()
    })
  })

  it('renders loading state while loading', async () => {
    useFetchPosts.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    })

    render(<PostsPage />)

    const skeletons = screen.getAllByTestId('post-skeleton-item')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders no posts message when there are no posts', () => {
    useFetchPosts.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    })

    render(<PostsPage />)

    const noPostsMessage = screen.getByText('No posts have been created yet.')
    expect(noPostsMessage).toBeInTheDocument()
  })

  it('renders posts when data is available', () => {
    const mockPosts = [
      { id: 1, title: 'Test Post' },
      { id: 2, title: 'Another Post' },
    ]
    useFetchPosts.mockReturnValue({
      data: mockPosts,
      loading: false,
      error: null,
    })

    render(<PostsPage />)

    mockPosts.forEach(post => {
      const postElement = screen.getByText(post.title)
      expect(postElement).toBeInTheDocument()
    })
  })
})
