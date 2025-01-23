/*
  Warnings:

  - You are about to drop the column `manufacturer` on the `Disc` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Disc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disc" DROP COLUMN "manufacturer",
ADD COLUMN     "brand" TEXT NOT NULL;
