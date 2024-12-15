import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export enum DifficultyLevel {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

export class GetStoriesQueryDto {
  @ApiProperty({
    description: '난이도 레벨 ID',
    example: DifficultyLevel.beginner,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  level: DifficultyLevel;
}
