/*
  Warnings:

  - You are about to drop the column `answer` on the `user_answers` table. All the data in the column will be lost.
  - You are about to drop the column `is_correct` on the `user_answers` table. All the data in the column will be lost.
  - Added the required column `story_id` to the `user_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_answers` DROP FOREIGN KEY `user_answers_ibfk_1`;

-- AlterTable
ALTER TABLE `user_answers` DROP COLUMN `answer`,
    DROP COLUMN `is_correct`,
    ADD COLUMN `answer_en` TEXT NULL,
    ADD COLUMN `answer_ko` TEXT NULL,
    ADD COLUMN `story_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `user_answers_story_id_idx` ON `user_answers`(`story_id`);

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_example_sentence_id_fkey` FOREIGN KEY (`example_sentence_id`) REFERENCES `example_sentences`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_story_id_fkey` FOREIGN KEY (`story_id`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `user_answers` RENAME INDEX `example_sentence_id` TO `user_answers_example_sentence_id_idx`;
