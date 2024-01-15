import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserFieldName1705335823418 implements MigrationInterface {
    name = 'ChangeUserFieldName1705335823418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "isSuperUser" TO "is_super_user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "is_super_user" TO "isSuperUser"`);
    }

}
