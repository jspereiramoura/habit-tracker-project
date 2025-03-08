import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./config/db/db.module";
import { HabitModule } from "./habit/habit.module";
import { UsersModule } from "./users/users.module";
import { StatisticsModule } from "./statistics/statistics.module";

@Module({
  imports: [DbModule, UsersModule, AuthModule, HabitModule, StatisticsModule]
})
export class AppModule {}
