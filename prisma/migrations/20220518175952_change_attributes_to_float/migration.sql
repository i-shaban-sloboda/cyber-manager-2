/*
  Warnings:

  - You are about to alter the column `base_health_regen` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `base_mana_regen` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `base_armor` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `str_gain` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `agi_gain` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `int_gain` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `attack_rate` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `turn_rate` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Hero" ALTER COLUMN "base_health_regen" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "base_mana_regen" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "base_armor" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "str_gain" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "agi_gain" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "int_gain" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "attack_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "turn_rate" SET DATA TYPE DOUBLE PRECISION;
