import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostAnswerDto, StoryDetailDto, StoryDto, UserAnswerDto } from '../dtos/story.dto';
import { GetStoriesQueryDto } from '../dtos/story-query.dto';
import StoryListUc from '../usecases/story-list';
import StoryByIdUc from '../usecases/story-by-id';
import { JwtAuthGuard } from '@infra/services/jwt/guards/jwt-auth.guard';
import { CurrentUser } from '@infra/services/jwt/decorators/user.decorator';
import StoryCommandUc from '../usecases/story-command';
import SimpleResponseDto from 'src/domain/common/dtos/SimpleResponseDto';

@Controller('v1/stories')
@ApiTags('Stories')
export default class StoryController {
  constructor(
    private readonly storyListUc: StoryListUc,
    private readonly storyByIdUc: StoryByIdUc,
    private readonly storyCommandUc: StoryCommandUc,
  ) {}

  @Get()
  async getStories(@Query() query: GetStoriesQueryDto): Promise<StoryDto[]> {
    return await this.storyListUc.execute(query.level);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getStoryById(@Param('id') id: string, @CurrentUser() user): Promise<StoryDetailDto> {
    return await this.storyByIdUc.execute(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/answer')
  async postStory(@Body() story: PostAnswerDto, @CurrentUser() user): Promise<SimpleResponseDto> {
    console.log('user:  ', user);
    const userId = user.sub;
    await this.storyCommandUc.execute({ ...story, user_id: userId });
    return new SimpleResponseDto();
  }
}
