import { ApiResponseProperty } from "@nestjs/swagger";

export class HabitStatisticDto {
  @ApiResponseProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  id: string;
  @ApiResponseProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  habitId: string;
  @ApiResponseProperty({ example: 0 })
  totalLogs: number;
  @ApiResponseProperty({ example: 0 })
  completedLogs: number;
  @ApiResponseProperty({ example: 0 })
  completionRate: number;
  @ApiResponseProperty({ example: 0 })
  streakCurrent: number;
  @ApiResponseProperty({ example: 0 })
  streakLongest: number;
  @ApiResponseProperty({ example: "2025-03-07 18:20:23.377" })
  createdAt: Date;
  @ApiResponseProperty({ example: "2025-03-07 18:20:23.377" })
  updatedAt: Date;
}
