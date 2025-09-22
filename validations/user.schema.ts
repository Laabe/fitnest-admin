import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email'),
    role: z.string(),
});

export type UserFromValues = z.infer<typeof UserSchema>;