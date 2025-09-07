-- CreateTable
CREATE TABLE `MealPlans` (
    `plan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `plan_name` VARCHAR(191) NULL,
    `target_calories` DECIMAL(65, 30) NULL,
    `target_protein` DECIMAL(65, 30) NULL,
    `target_carbs` DECIMAL(65, 30) NULL,
    `target_fat` DECIMAL(65, 30) NULL,
    `source` ENUM('AUTOMATIC', 'MANUAL') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MealPlans` ADD CONSTRAINT `MealPlans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
