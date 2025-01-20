/*
  Warnings:

  - Added the required column `plastic` to the `Disc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disc" ADD COLUMN     "plastic" TEXT NOT NULL;
