import { z } from 'zod';

const validateUser = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['User', 'Admin']),
    verified: z.boolean().optional(),
    profile: z.object({
      name: z.string().min(1, 'Name is required'),
      bio: z.string().optional(),
      profilePicture: z.string().optional(),
      followers: z.array(z.string()).optional(),
      following: z.array(z.string()).optional(),
    }),
    createdAt: z.preprocess((arg) => {
      // Convert to Date if input is a string
      return typeof arg === 'string' ? new Date(arg) : arg;
    }, z.date()), // Validate as a date object
    updatedAt: z.preprocess((arg) => {
      return typeof arg === 'string' ? new Date(arg) : arg;
    }, z.date()),
  }),
});
export default validateUser;
