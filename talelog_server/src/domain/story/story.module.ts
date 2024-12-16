import { Module } from '@nestjs/common';
import GetStoriesByDifficultyLevelUc from './usecases/story-list';
import { PrismaModule } from '@infra/services/prisma/prisma.module';
import StoryController from './controllers/story.controller';
import StoryRepository from './repositories/story.repository';
import GetStoryByIdUc from './usecases/story-by-id';

const providers = [
  // uc
  GetStoriesByDifficultyLevelUc,
  GetStoryByIdUc,
  // repository
  StoryRepository,
];

@Module({
  imports: [PrismaModule],
  controllers: [StoryController],
  providers,
  exports: providers,
})
export default class StoryModule {}
