import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1687616379234 implements MigrationInterface {
  name = 'TestMigration1687616379234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ranking" ("ranking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ranking_position" integer NOT NULL, "fighter_id" uuid NOT NULL, CONSTRAINT "PK_deb95c934f7d9d99536ec7a857a" PRIMARY KEY ("ranking_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "statistics" ("statistics_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fighter_id" uuid NOT NULL, "total_wins" integer NOT NULL, "total_losses" integer NOT NULL, "total_draws" integer NOT NULL, "knockout_wins" integer NOT NULL, "submission_wins" integer NOT NULL, "decision_wins" integer NOT NULL, CONSTRAINT "PK_64580b4ea4d36aee041af89ac53" PRIMARY KEY ("statistics_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fighter" ("fighter_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fighter_name" character varying NOT NULL, "fighter_nickname" text NOT NULL, "fighter_birthdate" TIMESTAMP NOT NULL, "fighter_nationality" character varying NOT NULL, "fighter_weight_class" character varying NOT NULL, CONSTRAINT "UQ_81b64c614c593512c0b64bc1068" UNIQUE ("fighter_nickname"), CONSTRAINT "PK_76c8d6359ab02454ea737914b52" PRIMARY KEY ("fighter_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fights" ("fight_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fight_result" integer NOT NULL, "fight_rounds" integer NOT NULL, "fight_duration" integer NOT NULL, "eventIdEventId" uuid, "fighter1IdFighterId" uuid, "fighter2IdFighterId" uuid, CONSTRAINT "PK_61dc76f2c217d0e20394da69392" PRIMARY KEY ("fight_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("event_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_name" character varying NOT NULL, "event_date" TIMESTAMP NOT NULL, "event_location" character varying NOT NULL, "event_promotion" character varying NOT NULL, CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY ("event_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fights" ADD CONSTRAINT "FK_fc1bd2697c341d0cd5c990e31b9" FOREIGN KEY ("eventIdEventId") REFERENCES "event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fights" ADD CONSTRAINT "FK_593c3973f039f52e201e9c31e0d" FOREIGN KEY ("fighter1IdFighterId") REFERENCES "fighter"("fighter_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fights" ADD CONSTRAINT "FK_e300b17a040a0427d65e415d05f" FOREIGN KEY ("fighter2IdFighterId") REFERENCES "fighter"("fighter_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fights" DROP CONSTRAINT "FK_e300b17a040a0427d65e415d05f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fights" DROP CONSTRAINT "FK_593c3973f039f52e201e9c31e0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fights" DROP CONSTRAINT "FK_fc1bd2697c341d0cd5c990e31b9"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "fights"`);
    await queryRunner.query(`DROP TABLE "fighter"`);
    await queryRunner.query(`DROP TABLE "statistics"`);
    await queryRunner.query(`DROP TABLE "ranking"`);
  }
}
