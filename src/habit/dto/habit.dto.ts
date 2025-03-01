import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const habitSchema = z
  .object({
    name: z
      .string()
      .optional()
      .openapi({ example: "Awesome habit", description: "Name of the habit" }),
    description: z.string().optional().openapi({
      example: "This is an awesome habit",
      description: "Description of the habit"
    })
  })
  .openapi("Habit");

export type UpdateHabitDto = z.infer<typeof habitSchema>;
