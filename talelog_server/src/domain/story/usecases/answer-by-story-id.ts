import { Injectable, NotFoundException } from '@nestjs/common';
import StoryRepository from '../repositories/story.repository';

@Injectable()
export default class AnswerByStoryIdUc {
  constructor(private readonly storyRepository: StoryRepository) {}

  async execute(userId: string, storyId: number) {
    const story =
      await this.storyRepository.getUserAnswers(userId, storyId);
    if (!story) {
      throw new NotFoundException('Story not found');
    }
    return story;
  }
}
