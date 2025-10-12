/*
  Warnings:

  - You are about to drop the column `allergens` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `traces` on the `aliments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `aliments` DROP COLUMN `allergens`,
    DROP COLUMN `traces`;
