import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLatestMessageFields1706806678397 implements MigrationInterface {
    name = 'AddLatestMessageFields1706806678397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "latest_message" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "latest_message_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "latest_message_at"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "latest_message"`);
    }

}
