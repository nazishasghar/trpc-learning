import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1721563894667 implements MigrationInterface {
    name = 'InitialSetup1721563894667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(250) NOT NULL, UNIQUE INDEX \`IDX_a95e949168be7b7ece1a2382fe\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_refresh_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`token\` varchar(63) NOT NULL, \`user_id\` bigint NULL, INDEX \`IDX_cca1dbcca742456cf24913a0ab\` (\`token\`), UNIQUE INDEX \`IDX_8fffc8cd6c2673f64aa3ca9c10\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`address\` varchar(250) NOT NULL, UNIQUE INDEX \`IDX_7640d8ad91a4e271cba74e2262\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_refresh_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`token\` varchar(63) NOT NULL, \`user_id\` bigint NULL, INDEX \`IDX_2028eb33acd3e76e8eeecc6f60\` (\`token\`), UNIQUE INDEX \`IDX_c6547859a3a195d854afffeb45\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_refresh_token\` ADD CONSTRAINT \`FK_24e64309aedf1c04d857a456dfc\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admin_refresh_token\` ADD CONSTRAINT \`FK_ca406b974afc0c2a06a830ddbcb\` FOREIGN KEY (\`user_id\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin_refresh_token\` DROP FOREIGN KEY \`FK_ca406b974afc0c2a06a830ddbcb\``);
        await queryRunner.query(`ALTER TABLE \`user_refresh_token\` DROP FOREIGN KEY \`FK_24e64309aedf1c04d857a456dfc\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6547859a3a195d854afffeb45\` ON \`admin_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_2028eb33acd3e76e8eeecc6f60\` ON \`admin_refresh_token\``);
        await queryRunner.query(`DROP TABLE \`admin_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_7640d8ad91a4e271cba74e2262\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fffc8cd6c2673f64aa3ca9c10\` ON \`user_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_cca1dbcca742456cf24913a0ab\` ON \`user_refresh_token\``);
        await queryRunner.query(`DROP TABLE \`user_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_a95e949168be7b7ece1a2382fe\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
