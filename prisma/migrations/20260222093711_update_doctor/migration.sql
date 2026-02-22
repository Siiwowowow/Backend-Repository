/*
  Warnings:

  - You are about to drop the column `appointments` on the `doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "appointments",
ADD COLUMN     "appointmentFee" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
