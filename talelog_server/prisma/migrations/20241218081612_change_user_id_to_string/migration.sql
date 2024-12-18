/*
  Warnings:

  - Made the column `user_id` on table `user_answers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `example_sentence_id` on table `user_answers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user_answers` DROP FOREIGN KEY `user_answers_example_sentence_id_fkey`;

-- AlterTable
ALTER TABLE `user_answers` MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `example_sentence_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_example_sentence_id_fkey` FOREIGN KEY (`example_sentence_id`) REFERENCES `example_sentences`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- 기존 NULL 값을 가진 레코드 처리
UPDATE user_answers SET user_id = 'legacy_user' WHERE user_id IS NULL;

-- 그 다음 컬럼을 required로 변경
ALTER TABLE user_answers MODIFY user_id VARCHAR(191) NOT NULL;