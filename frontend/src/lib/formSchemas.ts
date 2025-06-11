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
  brand: z.string().min(1, { message: 'Disc brand is required' }),
  name: z.string().min(1, { message: 'Disc name is required' }),
  weight: z.number().int(),
  image: z.instanceof(File).optional(),
  category: z.string().min(1, { message: 'Disc category is required' }),
  plastic: z.string().min(1, { message: 'Disc plastic type is required' }),
  colour: z.string().min(1, { message: 'Disc colour is required' }),
  speed: z
    .number()
    .min(1, { message: 'Disc speed cannot be less than 1' })
    .max(14.5, { message: 'Disc speed cannot be more than 14.5' }),
  glide: z
    .number()
    .min(1, { message: 'Disc glide cannot be less than 1' })
    .max(7, { message: 'Disc glide cannot be more than 7' }),
  turn: z
    .number()
    .min(-7, { message: 'Disc turn cannot be less than -7' })
    .max(1, { message: 'Disc turn cannot be greater than 1' }),
  fade: z
    .number()
    .min(0, { message: 'Disc fade cannot be less than 0' })
    .max(5, { message: 'Disc fade cannot be greater than 5' }),
  bagID: z.string().optional(),
});

export const addBagFormSchema = z.object({
  name: z.string().min(1, { message: 'Bag name is required' }),
});

export const editDiscFormSchema = z.object({
  id: z.string(),
  brand: z.string().min(1, { message: 'Disc brand is required' }),
  name: z.string().min(1, { message: 'Disc name is required' }),
  weight: z.number().int(),
  image: z.string().optional(),
  category: z.string().min(1, { message: 'Disc category is required' }),
  plastic: z.string().min(1, { message: 'Disc plastic type is required' }),
  colour: z.string().min(1, { message: 'Disc colour is required' }),
  speed: z
    .number()
    .min(1, { message: 'Disc speed cannot be less than 1' })
    .max(14.5, { message: 'Disc speed cannot be more than 14.5' }),
  glide: z
    .number()
    .min(1, { message: 'Disc glide cannot be less than 1' })
    .max(7, { message: 'Disc glide cannot be more than 7' }),
  turn: z
    .number()
    .min(-7, { message: 'Disc turn cannot be less than -7' })
    .max(1, { message: 'Disc turn cannot be greater than 1' }),
  fade: z
    .number()
    .min(0, { message: 'Disc fade cannot be less than 0' })
    .max(5, { message: 'Disc fade cannot be greater than 5' }),
  bagID: z.string().optional(),
});

export const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
});
