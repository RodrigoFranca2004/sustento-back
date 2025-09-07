/*
  Warnings:

  - You are about to drop the column `name` on the `restrictions` table. All the data in the column will be lost.
  - Added the required column `restriction_name` to the `Restrictions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restrictions` DROP COLUMN `name`,
    ADD COLUMN `restriction_name` ENUM('VEGAN', 'VEGETARIAN', 'GLUTEN_FREE', 'LACTOSE_FREE') NOT NULL;
