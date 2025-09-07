/*
  Warnings:

  - A unique constraint covering the columns `[aliment_id,name]` on the table `Aliments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restriction_id,restriction_name]` on the table `Restrictions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `UserRestrictions` (
    `user_id` INTEGER NOT NULL,
    `restriction_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `restriction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Aliments_aliment_id_name_key` ON `Aliments`(`aliment_id`, `name`);

-- CreateIndex
CREATE UNIQUE INDEX `Restrictions_restriction_id_restriction_name_key` ON `Restrictions`(`restriction_id`, `restriction_name`);

-- AddForeignKey
ALTER TABLE `UserRestrictions` ADD CONSTRAINT `UserRestrictions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRestrictions` ADD CONSTRAINT `UserRestrictions_restriction_id_fkey` FOREIGN KEY (`restriction_id`) REFERENCES `Restrictions`(`restriction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
