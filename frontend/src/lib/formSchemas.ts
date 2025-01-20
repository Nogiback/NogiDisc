import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const signupFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const addDiscFormSchema = z.object({
  manufacturer: z.string().min(1, { message: 'Disc manufacturer is required' }),
  name: z.string().min(1, { message: 'Disc name is required' }),
  weight: z.number().int(),
  category: z.string().min(1, { message: 'Disc category is required' }),
  plastic: z.string().min(1, { message: 'Disc plastic type is required' }),
  colour: z.string().min(1, { message: 'Disc colour is required' }),
  speed: z
    .number()
    .min(1, { message: 'Disc speed must be greater than 1' })
    .max(14.5, { message: 'Disc speed must be less than 14.5' }),
  glide: z
    .number()
    .min(1, { message: 'Disc glide must be greater than 1' })
    .max(7, { message: 'Disc glide must be less than 7' }),
  turn: z
    .number()
    .min(-7, { message: 'Disc turn must be greater than -7' })
    .max(0, { message: 'Disc turn must be less than 0' }),
  fade: z
    .number()
    .min(0, { message: 'Disc fade must be greater than 0' })
    .max(5, { message: 'Disc fade must be less than 5' }),
  bagID: z.string().optional(),
});
