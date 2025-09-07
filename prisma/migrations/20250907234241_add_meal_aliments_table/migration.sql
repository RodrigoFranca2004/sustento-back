-- CreateTable
CREATE TABLE `MealAliments` (
    `meal_aliment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` DECIMAL(6, 2) NOT NULL,
    `measurement_unit` ENUM('KCAL', 'G', 'ML', 'UN') NOT NULL,
    `order` INTEGER NULL,
    `meal_id` INTEGER NOT NULL,
    `aliment_id` INTEGER NOT NULL,

    UNIQUE INDEX `MealAliments_meal_id_aliment_id_key`(`meal_id`, `aliment_id`),
    PRIMARY KEY (`meal_aliment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MealAliments` ADD CONSTRAINT `MealAliments_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealAliments` ADD CONSTRAINT `MealAliments_aliment_id_fkey` FOREIGN KEY (`aliment_id`) REFERENCES `Aliments`(`aliment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
