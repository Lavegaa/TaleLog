import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoryDetailDto, StoryDto } from '../dtos/story.dto';
import { GetStoriesQueryDto } from '../dtos/story-query.dto';
import GetStoriesByDifficultyLevelUc from '../usecases/story-list';
import GetStoryByIdUc from '../usecases/story-by-id';
import { JwtAuthGuard } from '@infra/services/jwt/guards/jwt-auth.guard';
import { CurrentUser } from '@infra/services/jwt/decorators/user.decorator';

@Controller('v1/stories')
@ApiTags('Stories')
export default class StoryController {
  constructor(
    private readonly getStoriesByDifficultyLevelUc: GetStoriesByDifficultyLevelUc,
    private readonly getStoryByIdUc: GetStoryByIdUc,
  ) {}

  @Get()
  async getStories(@Query() query: GetStoriesQueryDto): Promise<StoryDto[]> {
    return await this.getStoriesByDifficultyLevelUc.execute(query.level);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getStoryById(@Param('id') id: string, @CurrentUser() user): Promise<StoryDetailDto> {
    return await this.getStoryByIdUc.execute(Number(id));
  }
}
