/*
  Warnings:

  - You are about to drop the column `calories` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrate` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `measurement_amount` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `measurement_unit` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `aliments` table. All the data in the column will be lost.
  - Added the required column `barCode` to the `Aliments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Aliments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aliments` DROP COLUMN `calories`,
    DROP COLUMN `carbohydrate`,
    DROP COLUMN `fat`,
    DROP COLUMN `measurement_amount`,
    DROP COLUMN `measurement_unit`,
    DROP COLUMN `protein`,
    ADD COLUMN `alergenos` VARCHAR(191) NULL,
    ADD COLUMN `anvisaWarnings` VARCHAR(191) NULL,
    ADD COLUMN `barCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `brand` VARCHAR(191) NULL,
    ADD COLUMN `calories_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `carbs_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `dietaryInfo` JSON NULL,
    ADD COLUMN `fat_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `fiber_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `ingredients` TEXT NULL,
    ADD COLUMN `novaGroup` INTEGER NULL,
    ADD COLUMN `nutriScore` VARCHAR(191) NULL,
    ADD COLUMN `protein_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `quantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `saturatedFat_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `sodium_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `sugar_100g` DECIMAL(8, 2) NULL,
    ADD COLUMN `tracos` VARCHAR(191) NULL;
