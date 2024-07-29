import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useParams, useRouter } from 'next/navigation'
import PostUpdatePage from '../src/app/posts/[postId]/update/page'
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
  title: 'Test Title',
  content: 'Test Content must be at least 20 characters long',
  author: 'Test Author',
}

const mockUseRouter = {
  back: jest.fn(),
  replace: jest.fn(),
}

describe('PostUpdatePage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ postId: '1' })
    useFetchPost.mockReturnValue({
      post: mockPost,
      loading: false,
      error: null,
    })
    usePostsActions.mockReturnValue({
      updatePost: jest.fn(),
    })
    useRouter.mockReturnValue(mockUseRouter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the form with post data', async () => {
    render(<PostUpdatePage />)

    expect(screen.getByLabelText(/Title/i)).toHaveValue(mockPost.title)
    expect(screen.getByLabelText(/Content/i)).toHaveValue(mockPost.content)
    expect(screen.getByLabelText(/Author/i)).toHaveValue(mockPost.author)
  })

  test('handles form submission', async () => {
    const mockUpdatePost = jest.fn()
    usePostsActions.mockReturnValue({
      updatePost: mockUpdatePost,
    })

    render(<PostUpdatePage />)

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Updated Title' },
    })
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: 'Test Content must be at least 20 characters long' },
    })
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: 'Updated Author' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Update Post/i }))

    await waitFor(() => {
      expect(mockUpdatePost).toHaveBeenCalledWith('1', {
        title: 'Updated Title',
        content: 'Test Content must be at least 20 characters long',
        author: 'Updated Author',
      })
      expect(mockUseRouter.back).toHaveBeenCalled()
    })
  })

  test('shows loading skeleton when loading', () => {
    useFetchPost.mockReturnValue({
      post: null,
      loading: true,
      error: null,
    })

    render(<PostUpdatePage />)

    expect(screen.getByTestId('post-skeleton-item')).toBeInTheDocument()
  })

  test('shows error message on fetch error', () => {
    useFetchPost.mockReturnValue({
      post: null,
      loading: false,
      error: 'Failed to fetch',
    })

    render(<PostUpdatePage />)

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument()
    expect(mockUseRouter.replace).toHaveBeenCalledWith('/404')
  })
})
