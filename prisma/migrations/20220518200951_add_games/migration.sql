-- CreateEnum
CREATE TYPE "GameState" AS ENUM ('INITIALIZE', 'IN_PROGRESS', 'PROCESSED', 'FINISHED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gameId" TEXT;

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "state" "GameState" NOT NULL DEFAULT E'INITIALIZE',
    "started" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" TIMESTAMP(3),

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
