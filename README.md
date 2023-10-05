## 커밋 컨벤션

- Feat : 새로운 기능 추가
- Fix : 버그 수정
- Env : 개발 환경 관련 설정
- Style : 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만) ~ 코드 자체 스타일
- Refactor : 코드 리팩토링 (더 효율적인 코드로 변경 등)
- Design : **CSS** 등 디자인 추가/수정
- Comment : 주석 추가/수정
- Docs : 내부 문서 추가/수정
- Test : 테스트 추가/수정
- Chore : 빌드 관련 코드 수정
- Rename : 파일 및 폴더명 수정
- Remove : 파일 삭제

## 깃 전략

2명이서 진행되는 소규모 팀이다 보니 Dev브랜치에서의 Pull과 Push를 위주로 진행

- Main : 배포 브랜치
- Dev : 작업 브랜치

## Prettier & EsLint 설정

Prettier는 VSCode 사용시 저장 시 자동으로 적용, 자동으로 적용 안된다면 커밋 전 `npm run format:fix`로 해줘야합니다.
EsLint는 Airbnb 속성을 가져왔습니다.

- Prettier : 한줄에 최대 100자까지, 탭 사이즈는 2, 스트링 시 " 사용, Arrow 함수 사용, 세미콜론 해제

## CLI 순서

### 처음 환경 설정 시

1. git clone [github URL 주소]
2. `npm i`
3. `npm run dev` : 배포환경 확인

### 협업 시

1. `git pull origin dev` : 진행 사항 가져오기
2. `npm run format:fix` : prettier 속성에 맞춰 수정
3. `git add .` && `git commit -m"[커밋컨벤션]: [커밋메세지]"`
4. `git push origin dev` : 진행 사항 저장하기

## 배포 : CI/CD

### Github Actions 사용

Continuous Integration : Dev의 에러가 없을 경우 Main으로 자동 통합
Continuous Delivery : Main 브랜치 자동 배포

[배포링크] (www.naver.com)
