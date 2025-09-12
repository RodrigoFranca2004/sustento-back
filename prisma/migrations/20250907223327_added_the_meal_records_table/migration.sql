-- CreateTable
CREATE TABLE `MealRecords` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `meal_id` INTEGER NOT NULL,
    `aliment_id` INTEGER NOT NULL,
    `amount` DECIMAL(5, 2) NOT NULL,
    `unit` ENUM('KCAL', 'G', 'ML', 'UN') NOT NULL,
    `meal_date` DATE NOT NULL,
    `meal_moment` TIME NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_aliment_id_fkey` FOREIGN KEY (`aliment_id`) REFERENCES `Aliments`(`aliment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
