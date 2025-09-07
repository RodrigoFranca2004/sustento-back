-- CreateTable
CREATE TABLE `Aliments` (
    `aliment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `calories` DECIMAL(5, 2) NOT NULL,
    `protein` DECIMAL(5, 2) NOT NULL,
    `carbohydrate` DECIMAL(5, 2) NOT NULL,
    `fat` DECIMAL(5, 2) NOT NULL,
    `measurement_amount` DECIMAL(5, 2) NOT NULL,
    `measurement_unit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`aliment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
