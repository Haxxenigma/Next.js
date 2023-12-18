DROP DATABASE IF EXISTS db;
CREATE DATABASE IF NOT EXISTS db;
USE db;
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'YD_.w68XKtL~j3qxS4fFrm';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';
FLUSH PRIVILEGES;
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `tags` TEXT NULL,
    `preview` TEXT NULL,
    `previewHash` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `authorName` VARCHAR(191) NOT NULL,
    INDEX `author`(`authorName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `image` VARCHAR(255) NULL DEFAULT '/media/avatar.svg',
    `imageHash` VARCHAR(255) NULL,
    `birth` DATE NULL,
    `bio` TEXT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `provider` VARCHAR(60) NOT NULL DEFAULT 'credentials',
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `Article`
ADD CONSTRAINT `Article_ibfk_1` FOREIGN KEY (`authorName`) REFERENCES `User`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;