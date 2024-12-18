import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/services/prisma/prisma.service';
import { DifficultyLevel } from '../dtos/story-query.dto';
import { UserAnswerDto } from '../dtos/story.dto';
@Injectable()
export default class StoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getStoriesByDifficultyLevel(difficultyLevel: DifficultyLevel) {
    return await this.prisma.stories.findMany({
      where: {
        difficulty_levels: {
          level: difficultyLevel,
        },
      },
    });
  }

  async getStorySentenceAndKeywordsById(storyId: number) {
    return await this.prisma.stories.findUnique({
      where: {
        id: storyId,
      },
      include: {
        example_sentences: {
          include: {
            keywords: true,
          },
        },
      },
    });
  }

  async createUserAnswers(answers: UserAnswerDto) {
    return await this.prisma.user_answers.createMany({
      data: answers.answers.map(answer => ({
        user_id: answers.user_id,
        story_id: answers.story_id,
        example_sentence_id: answer.example_sentence_id,
        answer_ko: answer.answer_ko,
        answer_en: answer.answer_en,
      }))
    });
  }

  async getUserAnswers(userId: string, storyId: number) {
    return await this.prisma.user_answers.findMany({
      where: {
        user_id: userId,
        story_id: storyId,
      },
    });
  }
}
