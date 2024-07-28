import { z } from 'zod'

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title can be up to 100 characters long'),
  content: z
    .string()
    .trim()
    .min(20, 'Content must be at least 20 characters long')
    .max(1000, 'Content can be up to 1000 characters long'),
  author: z
    .string()
    .trim()
    .min(3, 'Author name must be at least 3 characters long')
    .max(50, 'Author name can be up to 50 characters long'),
})

export default schema
