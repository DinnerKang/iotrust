# IoTrust 프로젝트

## 기술 스택

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS Modules
- **국제화**: i18next, react-i18next
- **패키지 관리**: Yarn

## 프로젝트 실행 및 빌드

### 설치
```bash
yarn install
```

### 개발 서버 실행
```bash
yarn start:dev       # 개발 환경
yarn start:stage     # 스테이징 환경
yarn start:prod      # 프로덕션 환경
```

### 빌드
```bash
yarn build          # 프로덕션 빌드
yarn preview        # 빌드 결과 미리보기
```

### 코드 검사
```bash
yarn lint           # ESLint 실행
```

## 구현한 주요 요소

### 1. 기능/UI 분리 및 최적화
- **Custom Hook 분리**: `useHomeData`로 비즈니스 로직과 UI 로직 분리
  - API 호출 로직 (배너, 서비스, 즐겨찾기 데이터)
  - 상태 관리 및 데이터 변환 로직
  - 이벤트 핸들링 로직 (삭제 등)
- **메모이제이션**: `memo`를 활용한 렌더링 최적화

### 2. 다국어 지원 (i18n)
- **지원 언어**: 한국어(ko), 영어(en)
- **환경 변수 기반**: `VITE_LANGUAGE` 환경 변수로 언어 설정 (언어 변경 기능이 없고, 테스트 편하게 하기 위해 만들었습니다.)
- **테스트 방법**: 
  ```bash
  # 한국어
  VITE_LANGUAGE=ko yarn start
  
  # 영어
  VITE_LANGUAGE=en yarn start
  ```

### 3. 슬라이더 컴포넌트
- **자동 재생**: 8초 간격 자동 슬라이드 전환
- **터치 지원**: 모바일 터치 제스처 지원 (50px 이상 스와이프)

## 프로젝트 구조

```
src/
├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   └── ui/           # 기본 UI 컴포넌트 (Modal, Slider)
├── contexts/         # React Context
├── pages/            # 페이지별 컴포넌트
├── services/         # API 서비스 레이어
├── styles/           # 전역 스타일
└── utils/            # 유틸리티 함수
```

## AI 사용 여부
cursor를 이용한 단순 업무 작업 ex) 초기 프로젝트 세팅, 데이터 주고 채워넣기, Read Me 작성 등
 - react, vite, sass, typescript로 프로젝트 구성해줘
 - 다국어를 지원해주려고해. 다국어 세팅 도와줘
 - "github 데이터 복사본" 이 데이터에 맞춰서 mockData 를 완성해줘 ServiceItem 타입도 잘 봐줘


## 보완하고 싶은 점
 - 사용자 언어 변경 기능