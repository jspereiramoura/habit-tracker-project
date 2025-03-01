import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional()
});

export type UpdateHabitDto = z.infer<typeof habitSchema>;
