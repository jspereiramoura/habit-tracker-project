import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Habit } from "./habit.entity";
import { HabitStatus } from "./habit-status.enum";
import { UUIDTypes } from "uuid";

@Entity("habit_logs")
export class HabitLog {
  @PrimaryGeneratedColumn("uuid")
  id: UUIDTypes;

  @Column()
  habitId: UUIDTypes;

  @JoinColumn({ name: "habitId" })
  @ManyToOne(() => Habit, habit => habit.logs, { onDelete: "CASCADE" })
  habit: Habit;

  @Column({ type: "date" })
  date: Date;

  @Column({
    type: "enum",
    enum: HabitStatus
  })
  status: HabitStatus;
}
