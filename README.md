# KRDS Vue

> 한국 정부 디자인 시스템(Korea Government Design System)을 기반으로 한 Vue 3 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/@krds.ui/vue.svg)](https://www.npmjs.com/package/@krds.ui/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

KRDS Vue는 대한민국 정부 표준 디자인 시스템을 Vue 3 + TypeScript로 구현한 공식 컴포넌트 라이브러리입니다. 접근성(WCAG 2.1 AA)과 정부 표준 준수를 핵심 목표로 하며, 정부 및 공공기관 웹사이트 개발에 최적화되어 있습니다.

## 링크

- [Storybook 문서](https://krds.initializer.org/) - 컴포넌트 데모 및 API 문서
- [KRDS 공식 홈페이지](https://www.krds.go.kr/html/site/index.html) - 디자인 가이드라인 및 표준

## 주요 특징

- **Vue 3 완전 호환**: Composition API 기반 최신 Vue 3 지원
- **TypeScript 완전 지원**: 완벽한 타입 정의와 IntelliSense 지원
- **정부 표준 준수**: 대한민국 정부 디자인 시스템 공식 가이드라인 준수
- **접근성 우선**: WCAG 2.1 AA 준수, 스크린 리더 및 키보드 내비게이션 완벽 지원
- **40+ 컴포넌트**: 정부 웹사이트 개발에 필요한 다양한 UI 컴포넌트 제공
- **Tree-shaking 지원**: ES 모듈 번들로 최적화된 빌드 사이즈
- **Storybook 문서**: 인터랙티브한 컴포넌트 문서 및 데모

## 설치

```bash
# npm
npm install @krds.ui/vue

# pnpm (권장)
pnpm add @krds.ui/vue

# yarn
yarn add @krds.ui/vue
```

## 빠른 시작

### 1. 스타일 가져오기

메인 엔트리 파일(예: `main.ts` 또는 `main.js`)에서 KRDS 스타일을 가져옵니다:

```typescript
import '@krds.ui/vue/dist/style.css'
```

### 2. 컴포넌트 사용

```vue
<template>
  <div>
    <KrdsButton variant="primary" size="medium" @click="handleClick">
      확인
    </KrdsButton>

    <KrdsInput
      v-model="text"
      label="이름"
      placeholder="이름을 입력하세요"
      required
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { KrdsButton, KrdsInput } from '@krds.ui/vue'

const text = ref('')

const handleClick = () => {
  console.log('버튼 클릭됨')
}
</script>
```

## 주요 컴포넌트

전체 컴포넌트 목록과 상세 API는 [Storybook 문서](https://krds.initializer.org/)를 참조하세요.

## TypeScript 지원

KRDS Vue는 완전한 TypeScript 지원을 제공합니다:

```typescript
import type { KrdsButtonProps, KrdsInputProps } from '@krds.ui/vue'

// Props 타입 활용
const buttonProps: KrdsButtonProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false
}

// 이벤트 타입 활용
import type { KrdsInputEmits } from '@krds.ui/vue'

const handleInput: KrdsInputEmits['input'] = (value: string) => {
  console.log('입력값:', value)
}
```

## 개발 환경 요구사항

- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0 (권장 패키지 매니저)
- **Vue**: >= 3.5.0 (peer dependency)

## 접근성

KRDS Vue는 WCAG 2.1 AA 수준의 접근성을 준수합니다:

- 키보드 내비게이션 완전 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성 및 역할
- 색상 대비 및 포커스 표시
- Storybook의 `@storybook/addon-a11y`를 통한 자동 검증

## 기여

KRDS Vue는 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. 버그 리포트나 기능 요청: [GitHub Issues](https://github.com/Initializer-org/krds-vue/issues)
2. Pull Request: [GitHub Repository](https://github.com/Initializer-org/krds-vue)

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/Initializer-org/krds-vue.git
cd krds-vue

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook

# 테스트 실행
pnpm test

# 빌드
pnpm build
```

## 라이센스

MIT © [Initializer Team](https://github.com/Initializer-org)

## 관련 링크

- [GitHub Repository](https://github.com/Initializer-org/krds-vue)
- [npm Package](https://www.npmjs.com/package/@krds.ui/vue)
- [Storybook 문서](https://krds.initializer.org/)
- [KRDS 공식 홈페이지](https://www.krds.go.kr/html/site/index.html)
- [Issue Tracker](https://github.com/Initializer-org/krds-vue/issues)