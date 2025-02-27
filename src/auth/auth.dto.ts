import { z } from "zod";

export const signUpSchema = z.object({
  mail: z.string().email(),
  password: z.string().min(8).max(255),
  username: z.string().min(3).max(255)
});

const signUpShape = signUpSchema.shape;

export const signInSchema = z.object({
  password: signUpShape.password,
  mail: signUpShape.mail.optional(),
  username: signUpShape.username.optional()
});

export type SignUpDTO = z.infer<typeof signUpSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;
