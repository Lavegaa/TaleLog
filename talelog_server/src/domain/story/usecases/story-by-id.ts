import { Injectable } from '@nestjs/common';
import StoryRepository from '../repositories/story.repository';

@Injectable()
export default class GetStoryByIdUc {
  constructor(private readonly storyRepository: StoryRepository) {}

  async execute(storyId: number) {
    const story =
      await this.storyRepository.getStorySentenceAndKeywordsById(storyId);
    return story;
  }
}