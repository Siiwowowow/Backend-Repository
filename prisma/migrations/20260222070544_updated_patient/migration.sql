/*
  Warnings:

  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `DeletedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `needsPasswordChange` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "phone",
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "DeletedAt",
DROP COLUMN "needsPasswordChange",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userID_key" ON "Patient"("userID");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
