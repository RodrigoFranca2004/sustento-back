-- DropForeignKey
ALTER TABLE `mealaliments` DROP FOREIGN KEY `MealAliments_meal_id_fkey`;

-- DropForeignKey
ALTER TABLE `mealrecords` DROP FOREIGN KEY `MealRecords_meal_id_fkey`;

-- DropForeignKey
ALTER TABLE `mealrecords` DROP FOREIGN KEY `MealRecords_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `meals` DROP FOREIGN KEY `Meals_plan_id_fkey`;

-- DropForeignKey
ALTER TABLE `passwordresets` DROP FOREIGN KEY `PasswordResets_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `userevolutions` DROP FOREIGN KEY `UserEvolutions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `waterrecords` DROP FOREIGN KEY `WaterRecords_plan_id_fkey`;

-- DropIndex
DROP INDEX `MealRecords_meal_id_fkey` ON `mealrecords`;

-- DropIndex
DROP INDEX `MealRecords_user_id_fkey` ON `mealrecords`;

-- DropIndex
DROP INDEX `PasswordResets_user_id_fkey` ON `passwordresets`;

-- DropIndex
DROP INDEX `UserEvolutions_user_id_fkey` ON `userevolutions`;

-- DropIndex
DROP INDEX `WaterRecords_plan_id_fkey` ON `waterrecords`;

-- AddForeignKey
ALTER TABLE `PasswordResets` ADD CONSTRAINT `PasswordResets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvolutions` ADD CONSTRAINT `UserEvolutions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `MealPlans`(`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meals`(`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealAliments` ADD CONSTRAINT `MealAliments_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meals`(`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterRecords` ADD CONSTRAINT `WaterRecords_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `MealPlans`(`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE;
