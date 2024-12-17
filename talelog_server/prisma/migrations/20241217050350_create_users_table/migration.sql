-- CreateTable
CREATE TABLE `difficulty_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `example_sentences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `story_id` INTEGER NULL,
    `sequence` INTEGER NOT NULL,
    `content_ko` TEXT NOT NULL,
    `content_en` TEXT NOT NULL,

    INDEX `story_id`(`story_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keywords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sentence_id` INTEGER NULL,
    `word_ko` VARCHAR(100) NOT NULL,
    `word_en` VARCHAR(100) NOT NULL,

    INDEX `sentence_id`(`sentence_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `difficulty_id` INTEGER NULL,
    `title_ko` VARCHAR(200) NOT NULL,
    `title_en` VARCHAR(200) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `difficulty_id`(`difficulty_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `example_sentence_id` INTEGER NULL,
    `answer` TEXT NULL,
    `is_correct` BOOLEAN NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `example_sentence_id`(`example_sentence_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLoginAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `example_sentences` ADD CONSTRAINT `example_sentences_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `stories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `keywords` ADD CONSTRAINT `keywords_ibfk_1` FOREIGN KEY (`sentence_id`) REFERENCES `example_sentences`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stories` ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`difficulty_id`) REFERENCES `difficulty_levels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`example_sentence_id`) REFERENCES `example_sentences`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
