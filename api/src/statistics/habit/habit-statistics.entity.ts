import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UUIDTypes } from "uuid";
import { Habit } from "../../habit/entities/habit.entity";
import { HabitStatisticDto } from "./habit-statistics.dto";

@Entity()
export class HabitStatistics {
  @PrimaryGeneratedColumn("uuid")
  id: UUIDTypes;

  @OneToOne(() => Habit, { onDelete: "CASCADE" })
  @JoinColumn()
  habit: Habit;

  @Column({ type: "int", default: 0 })
  totalLogs: number;

  @Column({ type: "int", default: 0 })
  completedLogs: number;

  @Column({ type: "float", default: 0 })
  completionRate: number;

  @Column({ type: "int", default: 0 })
  streakCurrent: number;

  @Column({ type: "int", default: 0 })
  streakLongest: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDto(): HabitStatisticDto {
    return {
      id: this.id?.toString(),
      habitId: this.habit?.id.toString(),
      totalLogs: this.totalLogs,
      completedLogs: this.completedLogs,
      completionRate: this.completionRate,
      streakCurrent: this.streakCurrent,
      streakLongest: this.streakLongest,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
