import { MigrationInterface, QueryRunner } from "typeorm";

export class Habits1740777469350 implements MigrationInterface {
    name = 'Habits1740777469350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."habit_logs_status_enum" AS ENUM('completed', 'missed')`);
        await queryRunner.query(`CREATE TABLE "habit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "habitId" uuid NOT NULL, "date" date NOT NULL, "status" "public"."habit_logs_status_enum" NOT NULL, CONSTRAINT "PK_683b23b199ac5c9c1f06e0e7c9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b3ec33c2d7af69d09fcf4af7e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "habit_logs" ADD CONSTRAINT "FK_9a0a6583b2124b8883308c5c64d" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habits" ADD CONSTRAINT "FK_356d1f144ceadad6942fa17af64" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habits" DROP CONSTRAINT "FK_356d1f144ceadad6942fa17af64"`);
        await queryRunner.query(`ALTER TABLE "habit_logs" DROP CONSTRAINT "FK_9a0a6583b2124b8883308c5c64d"`);
        await queryRunner.query(`DROP TABLE "habits"`);
        await queryRunner.query(`DROP TABLE "habit_logs"`);
        await queryRunner.query(`DROP TYPE "public"."habit_logs_status_enum"`);
    }

}
