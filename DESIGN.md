# KRDS Vue 디자인 시스템

> 대한민국 정부 표준 디자인 시스템을 Vue 3로 구현한 컴포넌트 라이브러리

## 📋 프로젝트 개요

KRDS(Korea Government Design System)를 TypeScript + Vue 3 Composition API로 포팅하여 npm 패키지로 배포

## 🏗️ 아키텍처

### 패키지 구조
```
@krds/vue/
├── src/
│   ├── components/     # Vue 컴포넌트
│   ├── tokens/         # 디자인 토큰 
│   ├── styles/         # SCSS 스타일
│   ├── composables/    # Vue 컴포저블
│   ├── directives/     # 커스텀 디렉티브
│   └── utils/          # 유틸리티
└── dist/               # 빌드 결과물
```

### 컴포넌트 설계 원칙

1. **정부 표준 준수**: KRDS 원본 디자인 1:1 매핑
2. **접근성 우선**: WCAG 2.1 AA 준수 
3. **반응형 디자인**: 모바일 퍼스트
4. **TypeScript**: 완전한 타입 지원

## 🎨 디자인 토큰

### 색상 시스템
- **Primary**: 정부 브랜드 블루 (#3da5ec)
- **Secondary**: 그레이 계열
- **Semantic**: Success, Warning, Error, Info

### 타이포그래피
- **Font Family**: Pretendard (한글), Inter (영문)
- **Scale**: 12px ~ 48px (0.75rem ~ 3rem)

### 간격 시스템
- **Base Unit**: 4px (0.25rem)
- **Scale**: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48px

## 🛠️ 기술 스택

- **Framework**: Vue 3 + Composition API
- **Language**: TypeScript
- **Styling**: SCSS + CSS Modules
- **Build**: Vite
- **Testing**: Vitest + Vue Test Utils
- **Docs**: Storybook

## 📦 사용법

### 설치
```bash
npm install @krds/vue
```

### 플러그인 등록
```typescript
import { createApp } from 'vue'
import KrdsVue from '@krds/vue'
import '@krds/vue/style'

const app = createApp(App)
app.use(KrdsVue)
```

### 개별 컴포넌트 사용
```typescript
import { KrdsButton } from '@krds/vue'
```

## 🎯 주요 컴포넌트

### Form 컴포넌트
- KrdsButton, KrdsInput, KrdsSelect
- KrdsCheckbox, KrdsRadio, KrdsToggle

### Layout 컴포넌트  
- KrdsCard, KrdsModal, KrdsAccordion
- KrdsTab, KrdsGrid, KrdsLayout

### Navigation 컴포넌트
- KrdsNavigation, KrdsBreadcrumb, KrdsPagination

### Feedback 컴포넌트
- KrdsAlert, KrdsTooltip, KrdsBadge, KrdsProgress

## 🔧 개발 가이드

### 컴포넌트 개발 규칙
1. **Props**: kebab-case로 정의
2. **Events**: camelCase로 emit
3. **Slots**: 명시적 슬롯 정의
4. **Styling**: SCSS 모듈 사용

### 디렉터리 규칙
```
components/
├── atoms/KrdsButton/
│   ├── KrdsButton.vue      # 컴포넌트
│   ├── KrdsButton.stories.ts  # Storybook
│   ├── types.ts            # 타입 정의
│   └── index.ts            # Export
```

## 📚 문서화

- **Storybook**: 컴포넌트 문서 및 예제
- **TypeDoc**: API 문서 자동 생성
- **README**: 사용법 및 가이드

## ✅ 품질 보증

- **ESLint**: 코드 품질 검증
- **Prettier**: 코드 포맷팅
- **Vitest**: 단위 테스트 
- **Accessibility**: axe-core 검증