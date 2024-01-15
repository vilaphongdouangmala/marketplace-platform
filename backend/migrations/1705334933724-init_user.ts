import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUser1705334933724 implements MigrationInterface {
    name = 'InitUser1705334933724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "email" character varying(50) NOT NULL, "date_of_birth" TIMESTAMP WITH TIME ZONE NOT NULL, "country" character varying(50) NOT NULL, "isSuperUser" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
