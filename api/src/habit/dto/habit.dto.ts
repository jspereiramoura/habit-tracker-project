import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createHabitSchema = z
  .object({
    name: z
      .string()
      .min(4)
      .openapi({ example: "Awesome habit", description: "Name of the habit" }),
    description: z
      .string()
      .min(15)
      .openapi({
        example: "This is an awesome habit",
        description: "Description of the habit"
      })
      .optional(),
    tags: z
      .array(z.string())
      .optional()
      .openapi({
        example: ["tag1", "tag2"],
        description: "Tags for the habit"
      })
  })
  .openapi("Habit");

export const updateHabitSchema = createHabitSchema
  .partial()
  .openapi("UpdateHabit");

export type CreateHabitDto = z.infer<typeof createHabitSchema>;
export type UpdateHabitDto = z.infer<typeof updateHabitSchema>;
