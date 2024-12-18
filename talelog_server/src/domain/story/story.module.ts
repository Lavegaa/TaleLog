import { Module } from '@nestjs/common';
import GetStoriesByDifficultyLevelUc from './usecases/story-list';
import { PrismaModule } from '@infra/services/prisma/prisma.module';
import StoryController from './controllers/story.controller';
import StoryRepository from './repositories/story.repository';
import GetStoryByIdUc from './usecases/story-by-id';
import { JwtModule } from '@infra/services/jwt/jwt.module';
import { StoryService } from './services/story.service';
import StoryCommandUc from './usecases/story-command';
import AnswerByStoryIdUc from './usecases/answer-by-story-id';

const providers = [
  // uc
  GetStoriesByDifficultyLevelUc,
  GetStoryByIdUc,
  StoryCommandUc,
  AnswerByStoryIdUc,
  // repository
  StoryRepository,
  // service
  StoryService,
];

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [StoryController],
  providers,
  exports: providers,
})
export default class StoryModule {}
