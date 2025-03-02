import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { HabitStatus } from "../entities/habit-status.enum";

extendZodWithOpenApi(z);

export const updateLogSchema = z
  .object({
    status: z.nativeEnum(HabitStatus).openapi({
      example: HabitStatus.COMPLETED,
      description: "Status of the habit"
    })
  })
  .openapi("UpdateHabitLogObject");

export const logsQuerySchema = z
  .object({
    date: z
      .preprocess((arg: string) => {
        return new Date(arg);
      }, z.date())
      .openapi({ example: "2021-01-27" })
  })
  .openapi("DataQueryObject");

export type UpdateLogDto = z.infer<typeof updateLogSchema>;
export type LogsQueryDto = z.infer<typeof logsQuerySchema>;
