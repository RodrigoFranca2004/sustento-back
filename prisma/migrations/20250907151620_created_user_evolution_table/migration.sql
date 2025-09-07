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

-- AddForeignKey
ALTER TABLE `UserEvolutions` ADD CONSTRAINT `UserEvolutions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
