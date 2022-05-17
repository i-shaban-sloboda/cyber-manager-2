-- CreateEnum
CREATE TYPE "HeroAttribute" AS ENUM ('AGILITY', 'STREIGHT', 'INTELLECT');

-- CreateEnum
CREATE TYPE "HeroAttackType" AS ENUM ('MELEE', 'RANGE');

-- CreateEnum
CREATE TYPE "HeroRole" AS ENUM ('CARRY', 'ESCAPE', 'NUKER', 'INITIATOR', 'DURABLE', 'DISABLER', 'JUNGLER', 'SUPPORT', 'PUSHER');

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "primary_attr" "HeroAttribute" NOT NULL,
    "attack_type" "HeroAttackType" NOT NULL,
    "roles" "HeroRole"[],
    "img" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "base_health" INTEGER NOT NULL,
    "base_health_regen" DECIMAL(65,30) NOT NULL,
    "base_mana" INTEGER NOT NULL,
    "base_mana_regen" DECIMAL(65,30) NOT NULL,
    "base_armor" DECIMAL(65,30) NOT NULL,
    "base_mr" INTEGER NOT NULL,
    "base_attack_min" INTEGER NOT NULL,
    "base_attack_max" INTEGER NOT NULL,
    "base_str" INTEGER NOT NULL,
    "base_agi" INTEGER NOT NULL,
    "base_int" INTEGER NOT NULL,
    "str_gain" DECIMAL(65,30) NOT NULL,
    "agi_gain" DECIMAL(65,30) NOT NULL,
    "int_gain" DECIMAL(65,30) NOT NULL,
    "attack_range" INTEGER NOT NULL,
    "projectile_speed" INTEGER NOT NULL,
    "attack_rate" DECIMAL(65,30) NOT NULL,
    "move_speed" INTEGER NOT NULL,
    "turn_rate" DECIMAL(65,30) NOT NULL,
    "cm_enabled" BOOLEAN NOT NULL,
    "legs" INTEGER NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_img_key" ON "Hero"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_icon_key" ON "Hero"("icon");
