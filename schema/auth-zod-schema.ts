import z from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, 'Password must be at most 10 characters')
    .max(12, 'Password must be less than 10 characters'),
});

export const signUpSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6, 'Password must be at most 10 characters')
      .max(12, 'Password must be less than 10 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = signUpSchema.pick({
  password: true,
  confirmPassword: true,
});

export type signInSchemaType = z.infer<typeof signInSchema>;

export type signUpSchemaType = z.infer<typeof signUpSchema>;

export const resetPasswordEmail = signInSchema.pick({ email: true });

export type resetPasswordEmailType = z.infer<typeof resetPasswordEmail>;

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
