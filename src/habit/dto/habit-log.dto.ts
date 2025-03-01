import { z } from "zod";
import { HabitStatus } from "../entities/habit-status.enum";

export const updateLogSchema = z.object({
  habitId: z.string().optional(),
  status: z.nativeEnum(HabitStatus)
});

export const logsQuerySchema = z.object({
  date: z.preprocess((arg: string) => {
    const [year, month, day] = arg.split("-");
    return new Date(`${year}-${month}-${day}`);
  }, z.date())
});

export type UpdateLogDto = z.infer<typeof updateLogSchema>;
export type LogsQueryDto = z.infer<typeof logsQuerySchema>;
