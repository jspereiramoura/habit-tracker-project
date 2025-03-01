import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UUIDTypes } from "uuid";
import { Habit } from "../habit/entities/habit.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  uuid: UUIDTypes;

  @Column()
  hash: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  mail: string;

  @OneToMany(() => Habit, habit => habit.user, { lazy: true })
  habits: Promise<Habit[]>;
}
