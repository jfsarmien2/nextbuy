import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
