import { z } from 'zod';

export const ReviewSchema = z.object({});

const wishListSchema = z.object({
  content_id: z.string(),
  title: z.string(),
  description: z.string(),
  time: z.string(),
});

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
