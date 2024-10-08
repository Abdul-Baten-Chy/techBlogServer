import { z } from 'zod';

export const carValidation = z.object({
  body: z.object({
    post: z.string(),
    author: z.string(),
    content: z.string().min(1, 'Content is required'),
    createdAt: z.date().optional(),
  }),
});
export const carValidationUpdate = z.object({
  body: z.object({
    post: z.string().optional(),
    author: z.string().optional(),
    content: z.string().min(1, 'Content is required').optional(),
    createdAt: z.date().optional(),
  }),
});
