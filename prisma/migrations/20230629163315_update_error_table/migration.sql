/*
  Warnings:

  - You are about to drop the `erros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `erros`;

-- CreateTable
CREATE TABLE `errors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
