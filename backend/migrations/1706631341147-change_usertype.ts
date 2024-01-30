import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUsertype1706631341147 implements MigrationInterface {
    name = 'ChangeUsertype1706631341147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "is_super_user" TO "user_type"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type"`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_type" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user_type" TO "is_super_user"`);
    }

}
