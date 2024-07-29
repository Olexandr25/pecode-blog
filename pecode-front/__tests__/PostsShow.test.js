import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useParams, useRouter } from 'next/navigation'
import PostViewPage from '../src/app/posts/[postId]/page'
import { useFetchPost, usePostsActions } from '../src/app/posts/hooks'

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}))

jest.mock('../src/app/posts/hooks', () => ({
  useFetchPost: jest.fn(),
  usePostsActions: jest.fn(),
}))

const mockPost = {
  id: 1,
  title: 'Test Title',
  content: 'Test Content',
  author: 'Test Author',
  date: '2023-01-01',
}

const mockUseRouter = {
  back: jest.fn(),
  push: jest.fn(),
}

describe('PostViewPage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ postId: '1' })
    useFetchPost.mockReturnValue({
      post: mockPost,
      loading: false,
      error: null,
    })
    usePostsActions.mockReturnValue({
      deletePost: jest.fn(),
    })
    useRouter.mockReturnValue(mockUseRouter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading view when loading', () => {
    useFetchPost.mockReturnValue({
      post: null,
      loading: true,
      error: null,
    })

    render(<PostViewPage />)

    expect(screen.getByTestId('post-skeleton-item')).toBeInTheDocument()
  })

  test('renders post data when available', () => {
    render(<PostViewPage />)

    expect(screen.getByText(mockPost.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.content)).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'h6' && content.includes(mockPost.author)
    })).toBeInTheDocument()
  })

  test('shows error message when there is an error', () => {
    useFetchPost.mockReturnValue({
      post: null,
      loading: false,
      error: 'Failed to fetch post',
    })

    render(<PostViewPage />)

    expect(screen.getByText(/Failed to fetch post/i)).toBeInTheDocument()
  })

  test('handles post deletion', async () => {
    const mockDeletePost = jest.fn()
    usePostsActions.mockReturnValue({
      deletePost: mockDeletePost,
    })

    render(<PostViewPage />)

    fireEvent.click(screen.getByText(/Delete/i))

    // Click "Yes" on the confirmation dialog
    fireEvent.click(screen.getByText(/Yes/i))

    await waitFor(() => {
      expect(mockDeletePost).toHaveBeenCalledWith('1')
      expect(screen.getByText(/Post deleted successfully!/i)).toBeInTheDocument()
    })
  })

  test('handles post update navigation', () => {
    render(<PostViewPage />)

    fireEvent.click(screen.getByText(/Update/i))

    expect(mockUseRouter.push).toHaveBeenCalledWith('/posts/1/update')
  })
})
