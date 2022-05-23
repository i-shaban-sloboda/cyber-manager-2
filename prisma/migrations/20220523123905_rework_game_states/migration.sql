/*
  Warnings:

  - The values [INITIALIZE,PROCESSED] on the enum `GameState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameState_new" AS ENUM ('MATHING', 'PICKING', 'IN_PROGRESS', 'PROCESSING', 'FINISHED');
ALTER TABLE "Game" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Game" ALTER COLUMN "state" TYPE "GameState_new" USING ("state"::text::"GameState_new");
ALTER TYPE "GameState" RENAME TO "GameState_old";
ALTER TYPE "GameState_new" RENAME TO "GameState";
DROP TYPE "GameState_old";
ALTER TABLE "Game" ALTER COLUMN "state" SET DEFAULT 'MATHING';
COMMIT;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "state" SET DEFAULT E'MATHING';
