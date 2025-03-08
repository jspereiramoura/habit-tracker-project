import { Module } from "@nestjs/common";
import { StatisticsController } from "./statistics.controller";
import { HabitStatisticsService } from "./habit/habit-statistics.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HabitStatistics } from "./habit/habit-statistics.entity";
import { HabitLogSubscriber } from "./statistics.subscriber";
import { Habit } from "../habit/entities/habit.entity";
import { HabitLog } from "../habit/entities/habit-log.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog, HabitStatistics])],
  controllers: [StatisticsController],
  providers: [HabitStatisticsService, HabitLogSubscriber]
})
export class StatisticsModule {}
