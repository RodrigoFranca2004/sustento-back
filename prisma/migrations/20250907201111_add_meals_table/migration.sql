-- CreateTable
CREATE TABLE `Meals` (
    `meal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meal_name` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `plan_id` INTEGER NOT NULL,

    UNIQUE INDEX `Meals_plan_id_meal_name_key`(`plan_id`, `meal_name`),
    PRIMARY KEY (`meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `MealPlans`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
