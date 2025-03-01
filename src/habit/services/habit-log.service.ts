import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HabitLog } from "../entities/habit-log.entity";
import { Repository } from "typeorm";
import { UUIDTypes } from "uuid";
import { Habit } from "../entities/habit.entity";
import { HabitStatus } from "../entities/habit-status.enum";
import { UpdateLogDto } from "../dto/habit-log.dto";

@Injectable()
export class HabitLogService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    @InjectRepository(HabitLog)
    private readonly habitLogRepository: Repository<HabitLog>
  ) {}

  async generateOrGetLogsForDay(userId: UUIDTypes, date: Date) {
    const logs = await this.habitLogRepository.find({
      where: { date, habit: { user: { uuid: userId } } },
      relations: ["habit"]
    });

    const habits = await this.habitRepository.find({
      where: { user: { uuid: userId } }
    });

    const missingLogs = habits
      .filter(habit => !logs.some(log => log.habit.id === habit.id))
      .map(habit =>
        this.habitLogRepository.create({
          habit,
          date,
          status: HabitStatus.MISSED
        })
      );

    if (missingLogs.length > 0) {
      const insertedLogs = await this.habitLogRepository.save(missingLogs);
      logs.push(...insertedLogs);
    }

    return logs;
  }

  async updateHabitLog(
    id: UUIDTypes,
    userId: UUIDTypes,
    dto: UpdateLogDto
  ): Promise<HabitLog> {
    const log = await this.habitLogRepository.findOne({
      where: { id },
      relations: ["habit", "habit.user"]
    });

    if (!log) throw new Error("Habit Log not found");
    if (log.habit.user.uuid !== userId)
      throw new UnauthorizedException("This habit log does not belong to you");

    log.status = dto.status;

    await this.habitLogRepository.save(log);
    return log;
  }
}
