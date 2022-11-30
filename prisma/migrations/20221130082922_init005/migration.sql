/*
  Warnings:

  - You are about to drop the column `order` on the `Task` table. All the data in the column will be lost.
  - Added the required column `position` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "order",
ADD COLUMN     "position" INTEGER NOT NULL;
