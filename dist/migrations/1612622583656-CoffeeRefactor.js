"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1612622583656 = void 0;
class CoffeeRefactor1612622583656 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CoffeeRefactor1612622583656 = CoffeeRefactor1612622583656;
//# sourceMappingURL=1612622583656-CoffeeRefactor.js.map