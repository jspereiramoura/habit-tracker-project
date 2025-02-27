import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUIDTypes } from "uuid";

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
}
