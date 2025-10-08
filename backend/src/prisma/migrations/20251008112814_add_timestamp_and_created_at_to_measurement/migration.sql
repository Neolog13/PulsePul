/*
  Warnings:

  - You are about to drop the column `date` on the `Measurement` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Measurement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
