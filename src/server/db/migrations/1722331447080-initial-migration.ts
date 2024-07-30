import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1722331447080 implements MigrationInterface {
    name = 'InitialMigration1722331447080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`bio\` varchar(120) NOT NULL, \`position\` varchar(10) NOT NULL, \`password\` varchar(120) NOT NULL, UNIQUE INDEX \`IDX_7640d8ad91a4e271cba74e2262\` (\`uuid\`), UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(120) NOT NULL, \`bio\` varchar(50) NOT NULL, \`position\` varchar(10) NOT NULL, \`leader_id\` bigint NULL, UNIQUE INDEX \`IDX_54452b02a5a8c125422e369749\` (\`uuid\`), UNIQUE INDEX \`IDX_817d1d427138772d47eca04885\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feed_back\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`points\` varchar(20) NOT NULL, \`comments\` varchar(200) NOT NULL, \`feed_back_date\` datetime(0) NOT NULL, \`feed_back_by_id\` bigint NULL, \`employee_id\` bigint NULL, UNIQUE INDEX \`IDX_996e481eb9cf6d9c21519b7951\` (\`uuid\`), UNIQUE INDEX \`REL_d3134b5b008d2b25b299572c52\` (\`feed_back_by_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_refresh_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`token\` varchar(63) NOT NULL, \`employee_id\` bigint NULL, INDEX \`IDX_79bc433569c468b1bb209398b5\` (\`token\`), UNIQUE INDEX \`IDX_65438320f79fb2782691133390\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_refresh_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL COMMENT 'uuid', \`deleted_at\` datetime(0) NULL, \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`token\` varchar(63) NOT NULL, \`user_id\` bigint NULL, INDEX \`IDX_2028eb33acd3e76e8eeecc6f60\` (\`token\`), UNIQUE INDEX \`IDX_c6547859a3a195d854afffeb45\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_9b978d84b189acc9ab564038e73\` FOREIGN KEY (\`leader_id\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`feed_back\` ADD CONSTRAINT \`FK_d3134b5b008d2b25b299572c520\` FOREIGN KEY (\`feed_back_by_id\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`feed_back\` ADD CONSTRAINT \`FK_d8a6656d8129ff1dae8c1fafd45\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_refresh_token\` ADD CONSTRAINT \`FK_09861a08fef8ef35849509c024a\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admin_refresh_token\` ADD CONSTRAINT \`FK_ca406b974afc0c2a06a830ddbcb\` FOREIGN KEY (\`user_id\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin_refresh_token\` DROP FOREIGN KEY \`FK_ca406b974afc0c2a06a830ddbcb\``);
        await queryRunner.query(`ALTER TABLE \`employee_refresh_token\` DROP FOREIGN KEY \`FK_09861a08fef8ef35849509c024a\``);
        await queryRunner.query(`ALTER TABLE \`feed_back\` DROP FOREIGN KEY \`FK_d8a6656d8129ff1dae8c1fafd45\``);
        await queryRunner.query(`ALTER TABLE \`feed_back\` DROP FOREIGN KEY \`FK_d3134b5b008d2b25b299572c520\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_9b978d84b189acc9ab564038e73\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6547859a3a195d854afffeb45\` ON \`admin_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_2028eb33acd3e76e8eeecc6f60\` ON \`admin_refresh_token\``);
        await queryRunner.query(`DROP TABLE \`admin_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_65438320f79fb2782691133390\` ON \`employee_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_79bc433569c468b1bb209398b5\` ON \`employee_refresh_token\``);
        await queryRunner.query(`DROP TABLE \`employee_refresh_token\``);
        await queryRunner.query(`DROP INDEX \`REL_d3134b5b008d2b25b299572c52\` ON \`feed_back\``);
        await queryRunner.query(`DROP INDEX \`IDX_996e481eb9cf6d9c21519b7951\` ON \`feed_back\``);
        await queryRunner.query(`DROP TABLE \`feed_back\``);
        await queryRunner.query(`DROP INDEX \`IDX_817d1d427138772d47eca04885\` ON \`employee\``);
        await queryRunner.query(`DROP INDEX \`IDX_54452b02a5a8c125422e369749\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_7640d8ad91a4e271cba74e2262\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
