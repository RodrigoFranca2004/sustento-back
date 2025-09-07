/*
  Warnings:

  - You are about to alter the column `measurement_unit` on the `aliments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `aliments` MODIFY `measurement_unit` ENUM('KCAL', 'G', 'ML', 'UN') NOT NULL;
