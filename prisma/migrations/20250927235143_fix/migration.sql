/*
  Warnings:

  - You are about to drop the column `registered_at` on the `userevolutions` table. All the data in the column will be lost.
  - You are about to drop the column `waist` on the `userevolutions` table. All the data in the column will be lost.
  - Added the required column `meal_type` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mealplans` ADD COLUMN `target_water` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `meals` ADD COLUMN `meal_type` ENUM('FIXED', 'FREE') NOT NULL;

-- AlterTable
ALTER TABLE `userevolutions` DROP COLUMN `registered_at`,
    DROP COLUMN `waist`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `body_fat` DECIMAL(5, 2) NULL;

-- CreateTable
CREATE TABLE `WaterRecords` (
    `water_record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `target_water` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `water_record_date` DATE NOT NULL,
    `water_consumption` DECIMAL(65, 30) NULL,
    `plan_id` INTEGER NOT NULL,

    PRIMARY KEY (`water_record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WaterRecords` ADD CONSTRAINT `WaterRecords_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `MealPlans`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
