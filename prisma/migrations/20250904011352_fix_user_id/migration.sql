/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - Added the required column `activity_lvl` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash_password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objective` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `active_plan_id` INTEGER NULL,
    ADD COLUMN `activity_lvl` ENUM('SEDENTARY', 'LIGHT', 'MODERATE', 'INTENSE') NOT NULL,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `gender` ENUM('M', 'F') NULL,
    ADD COLUMN `hash_password` VARCHAR(191) NOT NULL,
    ADD COLUMN `height` DECIMAL(65, 30) NULL,
    ADD COLUMN `objective` ENUM('LOSE_WEIGHT', 'GAIN_MUSCLE', 'MAINTENANCE') NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `weight` DECIMAL(65, 30) NULL,
    ADD PRIMARY KEY (`user_id`);
