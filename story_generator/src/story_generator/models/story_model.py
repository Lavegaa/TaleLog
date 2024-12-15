from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class DifficultyLevel(Base):
    __tablename__ = 'difficulty_levels'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    level = Column(String(20), nullable=False)
    stories = relationship('Story', back_populates='difficulty')

class Story(Base):
    __tablename__ = 'stories'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    difficulty_id = Column(Integer, ForeignKey('difficulty_levels.id'))
    title_ko = Column(String(200), nullable=False)
    title_en = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    difficulty = relationship('DifficultyLevel', back_populates='stories')
    sentences = relationship('ExampleSentence', back_populates='story')

class ExampleSentence(Base):
    __tablename__ = 'example_sentences'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    story_id = Column(Integer, ForeignKey('stories.id'))
    sequence = Column(Integer, nullable=False)
    content_ko = Column(Text, nullable=False)
    content_en = Column(Text, nullable=False)
    
    story = relationship('Story', back_populates='sentences')
    keywords = relationship('Keyword', back_populates='sentence')
    user_answers = relationship('UserAnswer', back_populates='sentence')

class Keyword(Base):
    __tablename__ = 'keywords'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    sentence_id = Column(Integer, ForeignKey('example_sentences.id'))
    word_ko = Column(String(100), nullable=False)
    word_en = Column(String(100), nullable=False)
    
    sentence = relationship('ExampleSentence', back_populates='keywords')

class UserAnswer(Base):
    __tablename__ = 'user_answers'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer)
    example_sentence_id = Column(Integer, ForeignKey('example_sentences.id'))
    answer = Column(Text)
    is_correct = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    sentence = relationship('ExampleSentence', back_populates='user_answers')