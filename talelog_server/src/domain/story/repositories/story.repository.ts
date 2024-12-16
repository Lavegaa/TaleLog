import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/services/prisma/prisma.service';
import { DifficultyLevel } from '../dtos/story-query.dto';
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
}
