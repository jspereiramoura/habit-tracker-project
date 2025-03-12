import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Not,
  UpdateEvent
} from "typeorm";
import { UUIDTypes } from "uuid";
import { HabitLog } from "../habit/entities/habit-log.entity";
import { HabitStatus } from "../habit/entities/habit-status.enum";
import { HabitStatistics } from "./habit/habit-statistics.entity";

type EventType = "INSERT" | "UPDATE";
type ParsedEvent = {
  eventType: EventType;
  manager: EntityManager;
  entity: HabitLog;
};

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
    await this.updateHabitStatistics({ ...event, eventType: "INSERT" });
  }

  async afterUpdate(event: UpdateEvent<HabitLog>) {
    if (event.entity) {
      await this.updateHabitStatistics({
        ...event,
        entity: event.entity as HabitLog,
        eventType: "UPDATE"
      });
    }
  }

  private calculateRate(itemsLength: number, completed: number) {
    return itemsLength ? (completed / itemsLength) * 100 : 0;
  }

  private async getTotalLogs(manager: EntityManager, habitId: UUIDTypes) {
    return await manager.getRepository(HabitLog).countBy({
      habit: { id: habitId }
    });
  }

  private async getCompletedLogs(manager: EntityManager, habitId: UUIDTypes) {
    return await manager.getRepository(HabitLog).countBy({
      habit: { id: habitId },
      status: HabitStatus.COMPLETED
    });
  }

  private async getHabitStatistics(manager: EntityManager, habitId: UUIDTypes) {
    let habitStats = await manager.getRepository(HabitStatistics).findOne({
      where: { habit: { id: habitId } }
    });

    if (!habitStats) {
      habitStats = manager
        .getRepository(HabitStatistics)
        .create({ habit: { id: habitId } });
    }

    return habitStats;
  }

  private async retrieveLastHabitLogWithDifferentId(
    manager: EntityManager,
    habitLogId: UUIDTypes
  ) {
    return await manager.getRepository(HabitLog).findOne({
      where: {
        id: Not(habitLogId),
        habit: { id: habitLogId }
      },
      order: { date: "DESC" }
    });
  }

  private async findLastStatus(
    habitLogId: UUIDTypes
  ): Promise<Pick<HabitLog, "status"> | null> {
    return await this.dataSource.manager.getRepository(HabitLog).findOne({
      where: { id: habitLogId },
      select: ["status"]
    });
  }

  private async updateHabitStreaks(
    eventType: string,
    entity: HabitLog,
    manager: EntityManager,
    habitStats: HabitStatistics
  ) {
    const lastStatus = await this.findLastStatus(entity.id);
    const lastHabitLog = await this.retrieveLastHabitLogWithDifferentId(
      manager,
      entity.id
    );

    const isCompleted = entity.status === HabitStatus.COMPLETED;
    const isLastCompleted = lastStatus?.status === HabitStatus.COMPLETED;

    if (lastHabitLog?.status === HabitStatus.MISSED) {
      habitStats.streakCurrent = 0;
    }

    if (isCompleted) {
      habitStats.streakCurrent++;
    } else if (isLastCompleted && eventType !== "INSERT") {
      habitStats.streakCurrent--;
      if (!lastHabitLog || lastHabitLog?.status === HabitStatus.COMPLETED) {
        habitStats.streakLongest--;
      }
    }

    if (habitStats.streakCurrent > habitStats.streakLongest) {
      habitStats.streakLongest = habitStats.streakCurrent;
    }
  }

  private async updateHabitStatistics({
    eventType,
    manager,
    entity
  }: ParsedEvent) {
    const habitId = entity?.habitId;
    const totalLogs = await this.getTotalLogs(manager, habitId);
    const completedLogs = await this.getCompletedLogs(manager, habitId);
    const habitStats = await this.getHabitStatistics(manager, habitId);

    habitStats.totalLogs = totalLogs;
    habitStats.completedLogs = completedLogs;
    habitStats.completionRate = this.calculateRate(totalLogs, completedLogs);
    habitStats.streakCurrent ??= 0;
    habitStats.streakLongest ??= 0;

    await this.updateHabitStreaks(eventType, entity, manager, habitStats);
    await manager.getRepository(HabitStatistics).save(habitStats);
  }
}
