import { Module } from "@nestjs/common";
import { HabitService } from "./services/habit.service";
import { HabitLogService } from "./services/habit-log.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Habit } from "./entities/habit.entity";
import { HabitLog } from "./entities/habit-log.entity";
import { HabitController } from "./controllers/habit.controller";
import { HabitLogController } from "./controllers/habit-log.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog])],
  providers: [HabitService, HabitLogService],
  controllers: [HabitController, HabitLogController]
})
export class HabitModule {}
