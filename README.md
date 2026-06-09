# KRDS Vue

> KRDS(Korea Digital Service Design System) 가이드를 Vue 3 + TypeScript 환경에서 사용할 수 있도록 구현한 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/@krds.ui/vue.svg)](https://www.npmjs.com/package/@krds.ui/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

KRDS Vue는 공공 웹서비스에서 반복되는 폼, 내비게이션, 레이아웃, 피드백 UI를 일관된 Vue 컴포넌트로 제공하는 라이브러리입니다. KRDS 디자인 토큰과 컴포넌트 스타일을 기반으로 하며, Vue 3 애플리케이션에서 전역 플러그인 또는 개별 컴포넌트 import 방식으로 사용할 수 있습니다.

이 패키지는 **ESM 전용**입니다. CommonJS `require()`는 지원하지 않습니다.

## 링크

- [Storybook 문서](https://krds.initializer.org/) - 컴포넌트 예제, Controls, API 문서
- [npm 패키지](https://www.npmjs.com/package/@krds.ui/vue)
- [GitHub 저장소](https://github.com/Initializer-org/krds-vue)
- [KRDS 공식 홈페이지](https://www.krds.go.kr/html/site/index.html)

## 특징

- **Vue 3 + TypeScript**: Vue 3.5 이상과 타입 정의를 지원합니다.
- **ESM-only 배포**: modern bundler 환경에 맞춘 ESM 산출물만 제공합니다.
- **컴포넌트 40+개**: Button, Form, Navigation, Layout, Feedback, Data Display 계열 컴포넌트를 포함합니다.
- **플러그인/개별 import 지원**: 전체 전역 등록 또는 필요한 컴포넌트만 import할 수 있습니다.
- **KRDS 스타일/토큰 포함**: 패키지 스타일 엔트리에서 토큰, 폰트, 컴포넌트 CSS를 함께 제공합니다.
- **접근성 고려**: 키보드 조작, ARIA 속성, 포커스 스타일, 고대비 모드를 고려해 구현합니다.
- **SSR 친화적 ID 생성**: 내부 ID가 필요한 컴포넌트는 Vue의 ID 생성 흐름을 따릅니다.

## 설치

```bash
# pnpm
pnpm add @krds.ui/vue

# npm
npm install @krds.ui/vue

# yarn
yarn add @krds.ui/vue
```

## 빠른 시작

### 1. 스타일 import

애플리케이션 엔트리에서 스타일을 한 번 import합니다. CSS 안의 아이콘 URL은 패키지의 `dist/img` 자산을 기준으로 상대 경로를 사용합니다.

```ts
import '@krds.ui/vue/style'
```

### 2. 전역 플러그인 등록

```ts
import { createApp } from 'vue'
import KrdsVue from '@krds.ui/vue'
import '@krds.ui/vue/style'
import App from './App.vue'

createApp(App).use(KrdsVue).mount('#app')
```

특정 컴포넌트만 전역 등록할 수도 있습니다.

```ts
app.use(KrdsVue, {
  components: ['KrdsButton', 'KrdsInput', 'KrdsModal']
})
```

### 3. 개별 컴포넌트 import

전역 등록이 필요 없다면 필요한 컴포넌트만 가져옵니다.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { KrdsButton, KrdsInput } from '@krds.ui/vue'

const name = ref('')
</script>

<template>
  <KrdsInput
    v-model="name"
    label="이름"
    placeholder="이름을 입력하세요"
    required
  />

  <KrdsButton variant="primary" size="medium">
    확인
  </KrdsButton>
</template>
```

## TypeScript

컴포넌트 props와 공통 타입을 패키지 루트에서 가져올 수 있습니다.

```ts
import type { KrdsButtonProps, KrdsInputProps, Size } from '@krds.ui/vue'

const size: Size = 'medium'

const buttonProps: KrdsButtonProps = {
  variant: 'primary',
  size,
  disabled: false
}

const inputProps: KrdsInputProps = {
  label: '이름',
  modelValue: '',
  size
}
```

## 스타일과 테마

KRDS Vue 스타일은 CSS custom properties를 기반으로 합니다. 프로젝트에서 토큰 값을 조정해야 한다면 원본 CSS를 수정하지 말고 애플리케이션 CSS에서 필요한 변수만 재선언합니다.

```css
:root {
  --krds-color-light-primary-50: #256ef4;
}
```

컬러 모드는 루트 요소의 `data-krds-mode` 속성으로 전환합니다.

```ts
document.documentElement.setAttribute('data-krds-mode', 'high-contrast')
```

지원 모드:

- `light`: 기본 라이트 모드
- `high-contrast`: 고대비 모드
- `theme`: 사용자 시스템 설정에 따라 라이트/고대비 스타일 적용

## 컴포넌트 범위

대표 컴포넌트는 다음과 같습니다. 전체 목록과 props/events는 [Storybook 문서](https://krds.initializer.org/)에서 확인하세요.

- **Actions**: `KrdsButton`, `KrdsButtonGroup`, `KrdsLink`, `KrdsTag`, `KrdsBadge`
- **Forms**: `KrdsInput`, `KrdsTextarea`, `KrdsSelect`, `KrdsDateInput`, `KrdsCheckbox`, `KrdsRadio`, `KrdsToggleSwitch`, `KrdsFileUpload`
- **Navigation**: `KrdsBreadcrumb`, `KrdsPagination`, `KrdsSideNavigation`, `KrdsInPageNavigation`, `KrdsStepIndicator`
- **Layout**: `KrdsLayout`, `KrdsHeader`, `KrdsFooter`, `KrdsMasthead`, `KrdsIdentifier`
- **Feedback/Overlay**: `KrdsModal`, `KrdsTooltip`, `KrdsCoachMark`, `KrdsContextualHelp`, `KrdsCriticalAlerts`, `KrdsSpinner`
- **Data/Content**: `KrdsTable`, `KrdsStructuredList`, `KrdsTextList`, `KrdsPanel`, `KrdsDisclosure`

## 요구사항

- **Runtime**: Vue `^3.5.0`
- **Module system**: ESM
- **Development**: Node.js `>=20.0.0`, pnpm `>=9.0.0`

## 개발

```bash
git clone https://github.com/Initializer-org/krds-vue.git
cd krds-vue

pnpm install
pnpm storybook
pnpm test
pnpm build
```

주요 스크립트:

- `pnpm storybook`: Storybook 개발 서버 실행
- `pnpm test`: Vitest 실행
- `pnpm build`: 타입 검사와 라이브러리 빌드
- `pnpm build-storybook`: 정적 Storybook 빌드

## 배포 산출물

`npm pack --dry-run` 기준으로 패키지에는 다음 산출물이 포함됩니다.

- `dist/krds-vue.es.js`
- `dist/style.css`
- `dist/types/index.d.ts`
- `dist/img/component/icon/*.svg`

## 라이선스

MIT © [Initializer Team](https://github.com/Initializer-org)
