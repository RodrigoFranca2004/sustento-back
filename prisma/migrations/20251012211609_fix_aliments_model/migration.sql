/*
  Warnings:

  - You are about to drop the column `vegan_status` on the `aliments` table. All the data in the column will be lost.
  - You are about to drop the column `vegetarian_status` on the `aliments` table. All the data in the column will be lost.
  - You are about to alter the column `anvisa_warnings` on the `aliments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `aliments` DROP COLUMN `vegan_status`,
    DROP COLUMN `vegetarian_status`,
    MODIFY `anvisa_warnings` JSON NULL;
