import { ApiResponseProperty } from "@nestjs/swagger";
import { HabitStatisticDto } from "./habit/habit-statistics.dto";

export class StatisticsOutputDto {
  @ApiResponseProperty({ type: [HabitStatisticDto] })
  habitStatistics: HabitStatisticDto[];
}
