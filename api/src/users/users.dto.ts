import { z } from "zod";

export const CreateUserSchema = z.object({
  hash: z.string(),
  mail: z.string().email(),
  username: z.string().min(3).max(255)
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
