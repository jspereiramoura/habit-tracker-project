import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Not,
  RemoveEvent,
  UpdateEvent
} from "typeorm";
import { HabitLog } from "../habit/entities/habit-log.entity";
import { HabitStatus } from "../habit/entities/habit-status.enum";
import { HabitStatistics } from "./habit/habit-statistics.entity";

type ParsedEvent = { manager: EntityManager; entity: HabitLog };

@Injectable()
@EventSubscriber()
export class HabitLogSubscriber implements EntitySubscriberInterface<HabitLog> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return HabitLog;
  }

  async afterInsert(event: InsertEvent<HabitLog>) {
    await this.updateHabitStatistics(event);
  }

  async afterUpdate(event: UpdateEvent<HabitLog>) {
    if (event.entity) {
      const parsedEvent = { ...event, entity: event.entity as HabitLog };
      await this.updateHabitStatistics(parsedEvent);
    }
  }

  async afterRemove(event: RemoveEvent<HabitLog>) {
    if (event.entity) {
      const parsedEvent = { entity: event.entity, manager: event.manager };
      await this.updateHabitStatistics(parsedEvent);
    }
  }

  private calculateRate(itemsLength: number, completed: number) {
    return itemsLength ? (completed / itemsLength) * 100 : 0;
  }

  private async updateHabitStatistics({ manager, entity }: ParsedEvent) {
    const habitId = entity?.habitId;
    const totalLogs = await manager.getRepository(HabitLog).countBy({
      habit: { id: habitId }
    });

    const completedLogs = await manager.getRepository(HabitLog).countBy({
      habit: { id: habitId },
      status: HabitStatus.COMPLETED
    });

    let habitStats = await manager.getRepository(HabitStatistics).findOne({
      where: { habit: { id: habitId } }
    });
    if (!habitStats) {
      habitStats = manager
        .getRepository(HabitStatistics)
        .create({ habit: { id: habitId } });
    }

    habitStats.totalLogs = totalLogs;
    habitStats.completedLogs = completedLogs;
    habitStats.completionRate = this.calculateRate(totalLogs, completedLogs);
    habitStats.streakCurrent ??= 0;
    habitStats.streakLongest ??= 0;

    const latestHabitLog = await manager.getRepository(HabitLog).findOne({
      where: {
        id: Not(entity.id),
        habit: { id: habitId }
      },
      order: { date: "DESC" }
    });

    if (latestHabitLog?.status === HabitStatus.MISSED) {
      habitStats.streakCurrent = 0;
    }

    if (entity?.status === HabitStatus.COMPLETED) {
      habitStats.streakCurrent++;
    }

    if (habitStats.streakCurrent > habitStats.streakLongest) {
      habitStats.streakLongest = habitStats.streakCurrent;
    }

    await manager.getRepository(HabitStatistics).save(habitStats);
  }
}
