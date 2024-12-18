import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@infra/services/jwt/services/jwt.service';
import StoryRepository from '../repositories/story.repository';
import { UserAnswerDto } from '../dtos/story.dto';

@Injectable()
export class StoryService {
  constructor(private readonly storyRepository: StoryRepository) {}

  async createUserAnswers(userAnswerDto: UserAnswerDto) {
    // 답변 데이터 유효성 검증
    if (!userAnswerDto.answers || userAnswerDto.answers.length === 0) {
      throw new Error('답변이 없습니다.');
    }

    // 모든 답변에 example_sentence_id가 있는지 확인
    const hasInvalidAnswer = userAnswerDto.answers.some(
      answer => !answer.example_sentence_id
    );
    if (hasInvalidAnswer) {
      throw new Error('유효하지 않은 답변이 있습니다.');
    }

    const result = await this.storyRepository.createUserAnswers(userAnswerDto);
    return result;
  }
}
