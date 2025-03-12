import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, Repository } from "typeorm";
import { UUIDTypes } from "uuid";
import { UpdateLogDto } from "../dto/habit-log.dto";
import { HabitLog } from "../entities/habit-log.entity";
import { HabitStatus } from "../entities/habit-status.enum";
import { Habit } from "../entities/habit.entity";

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

    const dateFilterOffset = new Date(date);
    dateFilterOffset.setHours(23, 59, 59, 999);

    const habits = await this.habitRepository.find({
      where: {
        user: { uuid: userId },
        createdAt: LessThanOrEqual(dateFilterOffset)
      },
      relations: ["user"]
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

    if (!log) throw new NotFoundException("Habit Log not found");
    if (log.habit.user.uuid !== userId)
      throw new UnauthorizedException("This habit log does not belong to you");

    log.status = dto.status;

    await this.habitLogRepository.save(log);
    return log;
  }
}
