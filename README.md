# TaleLog

## 소개
CrewAI를 활용해 이야기를 만들고, 이를 통해 영어 공부를 할 수 있는 서비스입니다.

## 구조

### story_generator
CrewAI를 통해 이야기를 만들어냅니다.
github action을 통해 이야기를 만들고, 이를 데이터베이스에 저장하는 과정을 CronJob으로 구성하였습니다.

### story_client
Next.js로 만든 프론트엔드입니다.

### story_server
Nest.js로 만든 서버입니다.

