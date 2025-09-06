/*
  Warnings:

  - You are about to alter the column `height` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `weight` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `height` DECIMAL(5, 2) NULL,
    MODIFY `weight` DECIMAL(5, 2) NULL;
