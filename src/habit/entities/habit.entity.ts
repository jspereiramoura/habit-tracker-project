import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UUIDTypes } from "uuid";
import { Users } from "../../users/users.entity";
import { HabitLog } from "./habit-log.entity";

@Entity("habits")
export class Habit {
  @PrimaryGeneratedColumn("uuid")
  id: UUIDTypes;

  @JoinColumn({ name: "userId" })
  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  user: Users;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date;

  @OneToMany(() => HabitLog, habitLog => habitLog.habit)
  logs: HabitLog[];
}
