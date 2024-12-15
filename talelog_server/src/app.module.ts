import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import StoryModule from './domain/story/story.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [StoryModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }, // https://docs.nestjs.com/techniques/serialization
  ],
})
export class AppModule {}
