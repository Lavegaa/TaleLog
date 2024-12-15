#!/usr/bin/env python
import os
import sys
import json
from story_generator.crew import StoryGeneratorCrew
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from story_generator.models.story_model import Story, DifficultyLevel, ExampleSentence, Keyword

def run():
    """
    Run the crew.
    """
    inputs = {
        'line_of_story': 2
    }
    output = StoryGeneratorCrew().crew().kickoff(inputs=inputs)    

    parsed_data = json.loads(output.raw)

    session = connect_db()
    parse_and_insert_data(session, parsed_data)
    
def parse_and_insert_data(session, json_data):
    try:
        # 난이도 매핑 정보
        difficulty_mapping = {
            'beginner': 'beginner',
            'intermediate': 'intermediate', 
            'advanced': 'advanced'
        }

        # 각 난이도별로 처리
        for eng_level, kor_level in difficulty_mapping.items():
            # 난이도 레벨 생성 또는 조회
            difficulty = session.query(DifficultyLevel).filter_by(level=kor_level).first()
            if not difficulty:
                difficulty = DifficultyLevel(level=kor_level)
                session.add(difficulty)
                session.flush()

            level_data = json_data[eng_level]

            # 스토리 생성
            story = Story(
                difficulty_id=difficulty.id,
                title_ko=level_data['title']['ko'],
                title_en=level_data['title']['en']
            )
            session.add(story)
            session.flush()

            # 예문 생성
            for idx, story_segment in enumerate(level_data['story'], 1):
                example = ExampleSentence(
                    story_id=story.id,
                    sequence=idx,
                    content_ko=story_segment['ko'],
                    content_en=story_segment['en']
                )
                session.add(example)
                session.flush()

                # 키워드 생성
                if 'keywords' in story_segment:
                    for keyword in story_segment['keywords']:
                        keyword_obj = Keyword(
                            sentence_id=example.id,
                            word_ko=keyword['ko'],
                            word_en=keyword['en']
                        )
                        session.add(keyword_obj)

        session.commit()
        print("데이터 저장이 완료되었습니다.")

    except Exception as e:
        session.rollback()
        print(f"데이터 저장 중 오류 발생: {e}")
        raise
    finally:
        session.close()

def connect_db():
    # .env 파일에서 환경 변수 로드
    load_dotenv()

    # 환경 변수 읽어오기 
    MYSQL_USER = os.getenv("MYSQL_USER")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
    MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")
    MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost") # 기본값 localhost
    MYSQL_PORT = os.getenv("MYSQL_PORT", "3306") # 기본값 3306

    # DB 연결 URL 생성
    DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
    
    try:
        engine = create_engine(DATABASE_URL)
        Session = sessionmaker(bind=engine)
        return Session()
    except Exception as e:
        print(f"데이터베이스 연결 중 오류 발생: {e}")
        raise
