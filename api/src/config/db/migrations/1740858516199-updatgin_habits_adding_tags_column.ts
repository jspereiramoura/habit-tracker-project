import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatginHabitsAddingTagsColumn1740858516199
  implements MigrationInterface
{
  name = "UpdatginHabitsAddingTagsColumn1740858516199";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "habits" ADD "tags" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "habits" DROP COLUMN "tags"`);
  }
}
