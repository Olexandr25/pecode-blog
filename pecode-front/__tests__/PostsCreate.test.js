import PostCreatePage from '@/app/posts/create/page'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { usePostsActions } from '../src/app/posts/hooks'

jest.mock('../src/app/posts/hooks')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('../src/app/_components', () => ({
  CustomSnackbar: jest.fn(() => null),
}))

describe('PostCreatePage', () => {
  const mockSubmitPost = jest.fn()
  const mockRouterReplace = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    usePostsActions.mockReturnValue({
      submitPost: mockSubmitPost,
    })
    useRouter.mockReturnValue({
      replace: mockRouterReplace,
    })
  })

  it('renders the form', () => {
    render(<PostCreatePage />)

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Create Post/i })
    ).toBeInTheDocument()
  })

  it('displays validation errors', async () => {
    render(<PostCreatePage />)

    fireEvent.click(screen.getByRole('button', { name: /Create Post/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/Title must be at least 5 characters long/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Content must be at least 20 characters long/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Author name must be at least 3 characters long/i)
      ).toBeInTheDocument()
    })
  })

  it('submits the form successfully', async () => {
    render(<PostCreatePage />)

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Valid Title' },
    })
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: 'Valid Content with long text' },
    })
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: 'Valid Author' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Create Post/i }))

    await waitFor(() => {
      expect(mockSubmitPost).toHaveBeenCalledWith({
        title: 'Valid Title',
        content: 'Valid Content with long text',
        author: 'Valid Author',
      })
      expect(mockRouterReplace).toHaveBeenCalledWith('/posts')
    })
  })

  it('displays an error message on submit failure',  () => {
    mockSubmitPost.mockRejectedValueOnce(new Error('Failed to create post'))
    render(<PostCreatePage />)

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Valid Title' },
    })
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: 'Valid Content with long text' },
    })
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: 'Valid Author' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Create Post/i }))

     waitFor(() => {
      expect(screen.getByText(/Failed to create post/i)).toBeInTheDocument()
    })
  })
})
