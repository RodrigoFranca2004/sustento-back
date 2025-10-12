-- AlterTable
-- Renomeia as colunas da tabela `aliments` de camelCase para snake_case preservando os dados.
ALTER TABLE `aliments`
    CHANGE COLUMN `alergenos` `allergens` VARCHAR(191) NULL,
    CHANGE COLUMN `anvisaWarnings` `anvisa_warnings` VARCHAR(191) NULL,
    CHANGE COLUMN `barCode` `bar_code` VARCHAR(191) NULL,
    CHANGE COLUMN `dietaryInfo` `dietary_info` JSON NULL,
    CHANGE COLUMN `imageUrl` `image_url` VARCHAR(191) NULL,
    CHANGE COLUMN `novaGroup` `nova_group` INTEGER NULL,
    CHANGE COLUMN `nutriScore` `nutri_score` VARCHAR(191) NULL,
    CHANGE COLUMN `saturatedFat_100g` `saturated_fat_100g` DECIMAL(8, 2) NULL,
    CHANGE COLUMN `tracos` `traces` VARCHAR(191) NULL;