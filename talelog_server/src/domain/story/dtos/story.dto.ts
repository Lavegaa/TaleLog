export class StoryDto {
  id: number;
  difficulty_id: number;
  title_ko: string;
  title_en: string;
  created_at: Date;
  updated_at: Date;
  example_sentences?: ExampleSentenceDto[];
  difficulty_levels?: DifficultyLevelDto;
}

export class ExampleSentenceDto {
  id: number;
  story_id: number;
  sequence: number;
  content_ko: string;
  content_en: string;
  keywords?: KeywordDto[];
  user_answers?: UserAnswerDto[];
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

export class UserAnswerDto {
  id: number;
  user_id: number;
  example_sentence_id: number;
  answer: string;
  is_correct: boolean;
  created_at: Date;
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
