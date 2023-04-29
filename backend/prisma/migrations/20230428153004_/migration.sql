/*
  Warnings:

  - Added the required column `url` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guest` ADD COLUMN `url` VARCHAR(191) NOT NULL;
