import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoryDto } from '../dtos/story.dto';
import { GetStoriesQueryDto } from '../dtos/story-query.dto';
import GetStoriesByDifficultyLevelUc from '../usecases/story-list';

@Controller('v1/stories')
@ApiTags('Stories')
export default class StoryController {
  constructor(
    private readonly getStoriesByDifficultyLevelUc: GetStoriesByDifficultyLevelUc,
  ) {}

  @Get()
  async getStories(@Query() query: GetStoriesQueryDto): Promise<StoryDto[]> {
    return await this.getStoriesByDifficultyLevelUc.execute(query.level);
  }
}
