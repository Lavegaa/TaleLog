import { Module } from '@nestjs/common';
import GetStoriesByDifficultyLevelUc from './usecases/story-list';
import { PrismaModule } from '@infra/services/prisma/prisma.module';
import StoryController from './controllers/story.controller';
import StoryRepository from './repositories/story.repository';

const providers = [GetStoriesByDifficultyLevelUc, StoryRepository];

@Module({
  imports: [PrismaModule],
  controllers: [StoryController],
  providers,
  exports: providers,
})
export default class StoryModule {}
