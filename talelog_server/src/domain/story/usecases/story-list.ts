import { Injectable } from '@nestjs/common';
import { DifficultyLevel } from '../dtos/story-query.dto';
import StoryRepository from '../repositories/story.repository';

@Injectable()
export default class StoryListUc {
  constructor(private readonly storyRepository: StoryRepository) {}

  async execute(difficulty: DifficultyLevel) {
    const stories =
      await this.storyRepository.getStoriesByDifficultyLevel(difficulty);
    return stories;
  }
}
