-- AlterTable
ALTER TABLE `logs` ADD COLUMN `action` VARCHAR(191) NULL,
    ADD COLUMN `entity_id` INTEGER NULL,
    ADD COLUMN `entity_type` VARCHAR(255) NULL;
