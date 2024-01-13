import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'login.emailErrorInvalid'
  }),
  password: z
    .string()
    .min(3)
    .max(20)
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;