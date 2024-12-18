import { Injectable } from '@nestjs/common';
import StoryRepository from '../repositories/story.repository';
import { UserAnswerDto } from '../dtos/story.dto';
import { StoryService } from '../services/story.service';

@Injectable()
export default class StoryCommandUc {
  constructor(private readonly storyService: StoryService) {}

  async execute(story: UserAnswerDto) {
    const stories =
      await this.storyService.createUserAnswers(story);
    return stories;
  }
}
