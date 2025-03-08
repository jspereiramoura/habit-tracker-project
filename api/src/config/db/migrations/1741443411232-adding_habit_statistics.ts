import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingHabitStatistics1741443411232 implements MigrationInterface {
  name = "AddingHabitStatistics1741443411232";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "habit_statistics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalLogs" integer NOT NULL DEFAULT '0', "completedLogs" integer NOT NULL DEFAULT '0', "completionRate" double precision NOT NULL DEFAULT '0', "streakCurrent" integer NOT NULL DEFAULT '0', "streakLongest" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "habitId" uuid, CONSTRAINT "REL_cdc3b451a7f8b0243c6a83e0b4" UNIQUE ("habitId"), CONSTRAINT "PK_9e6d7e72cb17491f0bc2b3be17e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "habit_statistics" ADD CONSTRAINT "FK_cdc3b451a7f8b0243c6a83e0b4b" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "habit_statistics" DROP CONSTRAINT "FK_cdc3b451a7f8b0243c6a83e0b4b"`
    );
    await queryRunner.query(`DROP TABLE "habit_statistics"`);
  }
}
