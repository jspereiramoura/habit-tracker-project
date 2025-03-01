import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { HabitLogController } from "./controllers/habit-log.controller";
import { HabitController } from "./controllers/habit.controller";
import { HabitLog } from "./entities/habit-log.entity";
import { Habit } from "./entities/habit.entity";
import { HabitLogService } from "./services/habit-log.service";
import { HabitService } from "./services/habit.service";

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog, Users])],
  providers: [HabitService, HabitLogService],
  controllers: [HabitController, HabitLogController]
})
export class HabitModule {}
