"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSync1612707200148 = void 0;
class SchemaSync1612707200148 {
    constructor() {
        this.name = 'SchemaSync1612707200148';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
        await queryRunner.query(`CREATE TABLE "evento" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_ceb2e9607555230aee6aff546b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5703701c7b8f852edaacca5ba0" ON "evento" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_3358e253f08c15990016da192d" ON "evento" ("name", "type") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_3358e253f08c15990016da192d"`);
        await queryRunner.query(`DROP INDEX "IDX_5703701c7b8f852edaacca5ba0"`);
        await queryRunner.query(`DROP TABLE "evento"`);
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
}
exports.SchemaSync1612707200148 = SchemaSync1612707200148;
//# sourceMappingURL=1612707200148-SchemaSync.js.map