-- DropForeignKey
ALTER TABLE `mealaliments` DROP FOREIGN KEY `MealAliments_aliment_id_fkey`;

-- DropForeignKey
ALTER TABLE `mealrecords` DROP FOREIGN KEY `MealRecords_aliment_id_fkey`;

-- DropIndex
DROP INDEX `MealAliments_aliment_id_fkey` ON `mealaliments`;

-- DropIndex
DROP INDEX `MealRecords_aliment_id_fkey` ON `mealrecords`;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_aliment_id_fkey` FOREIGN KEY (`aliment_id`) REFERENCES `Aliments`(`aliment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealAliments` ADD CONSTRAINT `MealAliments_aliment_id_fkey` FOREIGN KEY (`aliment_id`) REFERENCES `Aliments`(`aliment_id`) ON DELETE CASCADE ON UPDATE CASCADE;
