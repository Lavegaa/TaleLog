export class StoryDto {
  id: number;
  difficulty_id: number;
  title_ko: string;
  title_en: string;
  created_at: Date;
  updated_at: Date;
}

export class ExampleSentenceDto {
  id: number;
  story_id: number;
  sequence: number;
  content_ko: string;
  content_en: string;
  keywords?: KeywordDto[];
}

export class KeywordDto {
  id: number;
  sentence_id: number;
  word_ko: string;
  word_en: string;
}

export class DifficultyLevelDto {
  id: number;
  level: string;
}

export class PostAnswerDto {
  story_id: number;
  answers: {
    example_sentence_id: number;
    answer_ko: string | null;
    answer_en: string | null;
  }[];
}

export class UserAnswerDto extends PostAnswerDto {
  user_id: string;
}

export class UserAnswerResponseDto {
  id: number;
  created_at: Date | null;
  story_id: number;
  user_id: string;
  example_sentence_id: number;
  answer_ko: string | null;
  answer_en: string | null;
}

// 스토리 생성을 위한 DTO
export class CreateStoryDto {
  difficulty_id: number;
  title_ko: string;
  title_en: string;
}

// 스토리 수정을 위한 DTO
export class UpdateStoryDto {
  difficulty_id?: number;
  title_ko?: string;
  title_en?: string;
}

export class StoryDetailDto {
  id: number;
  difficulty_id: number;
  title_ko: string;
  title_en: string;
  created_at: Date;
  updated_at: Date;
  example_sentences: ExampleSentenceDto[];
}
