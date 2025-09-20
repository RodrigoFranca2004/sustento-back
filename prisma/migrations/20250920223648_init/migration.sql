-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `hash_password` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `gender` ENUM('M', 'F') NULL,
    `weight` DECIMAL(5, 2) NULL,
    `height` DECIMAL(5, 2) NULL,
    `objective` ENUM('LOSE_WEIGHT', 'GAIN_MUSCLE', 'MAINTENANCE') NULL,
    `activity_lvl` ENUM('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'ACTIVE', 'VERY_ACTIVE') NULL,
    `active_plan_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `PasswordResets_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealPlans` (
    `plan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_name` VARCHAR(191) NULL,
    `target_calories` DECIMAL(65, 30) NULL,
    `target_protein` DECIMAL(65, 30) NULL,
    `target_carbs` DECIMAL(65, 30) NULL,
    `target_fat` DECIMAL(65, 30) NULL,
    `source` ENUM('AUTOMATIC', 'MANUAL') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restrictions` (
    `restriction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `restriction_name` ENUM('VEGAN', 'VEGETARIAN', 'GLUTEN_FREE', 'LACTOSE_FREE') NOT NULL,

    UNIQUE INDEX `Restrictions_restriction_id_restriction_name_key`(`restriction_id`, `restriction_name`),
    PRIMARY KEY (`restriction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEvolutions` (
    `evolution_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `weight` DECIMAL(5, 2) NULL,
    `bmi` DECIMAL(5, 2) NULL,
    `waist` DECIMAL(5, 2) NULL,
    `body_fat` DECIMAL(5, 2) NULL,
    `registered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`evolution_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Aliments` (
    `aliment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `calories` DECIMAL(5, 2) NOT NULL,
    `protein` DECIMAL(5, 2) NOT NULL,
    `carbohydrate` DECIMAL(5, 2) NOT NULL,
    `fat` DECIMAL(5, 2) NOT NULL,
    `measurement_amount` DECIMAL(5, 2) NOT NULL,
    `measurement_unit` ENUM('KCAL', 'G', 'ML', 'UN') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Aliments_aliment_id_name_key`(`aliment_id`, `name`),
    PRIMARY KEY (`aliment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRestrictions` (
    `user_id` INTEGER NOT NULL,
    `restriction_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `restriction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `PasswordResets` ADD CONSTRAINT `PasswordResets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlans` ADD CONSTRAINT `MealPlans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvolutions` ADD CONSTRAINT `UserEvolutions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `MealPlans`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRestrictions` ADD CONSTRAINT `UserRestrictions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRestrictions` ADD CONSTRAINT `UserRestrictions_restriction_id_fkey` FOREIGN KEY (`restriction_id`) REFERENCES `Restrictions`(`restriction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecords` ADD CONSTRAINT `MealRecords_aliment_id_fkey` FOREIGN KEY (`aliment_id`) REFERENCES `Aliments`(`aliment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealAliments` ADD CONSTRAINT `MealAliments_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meals`(`meal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealAliments` ADD CONSTRAINT `MealAliments_aliment_id_fkey` FOREIGN KEY (`aliment_id`) REFERENCES `Aliments`(`aliment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
