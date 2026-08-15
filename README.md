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
- **KRDS 공식 컴포넌트 대응**: [공식 컴포넌트 55종](https://www.krds.go.kr/html/site/component/component_summary.html) 중 43종을 제공하며, 폼 레이아웃·아이콘 등 부가 컴포넌트를 포함해 총 50개 컴포넌트를 제공합니다.
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
  <KrdsInput v-model="name" label="이름" placeholder="이름을 입력하세요" required />

  <KrdsButton variant="primary" size="medium">확인</KrdsButton>
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

[KRDS 공식 컴포넌트 목록](https://www.krds.go.kr/html/site/component/component_summary.html) 55종 기준 대응 현황입니다. 각 컴포넌트의 props/events는 [Storybook 문서](https://krds.initializer.org/)에서 확인하세요.

| 분류             | 공식 컴포넌트 → 제공 컴포넌트                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 아이덴티티       | 공식 배너 `KrdsMasthead` · 운영기관 식별자 `KrdsIdentifier` · 헤더 `KrdsHeader` · 푸터 `KrdsFooter`                                                                                                                                                                                            |
| 탐색             | 건너뛰기 링크 `KrdsSkipLink` · 메인 메뉴 `KrdsMainMenu` · 브레드크럼 `KrdsBreadcrumb` · 사이드 메뉴 `KrdsSideNavigation` · 콘텐츠 내 탐색 `KrdsInPageNavigation` · 페이지네이션 `KrdsPagination`                                                                                               |
| 레이아웃 및 표현 | 구조화 목록 `KrdsStructuredList` · 긴급 공지 `KrdsCriticalAlerts` · 디스클로저 `KrdsDisclosure` · 모달 `KrdsModal` · 배지 `KrdsBadge` · 아코디언 `KrdsAccordionGroup`/`KrdsAccordionItem` · 캐러셀 `KrdsCarousel` · 탭 `KrdsTabs` · 표 `KrdsTable` · 텍스트 목록 `KrdsTextList` · 달력(`KrdsDateInput`에 내장) |
| 액션             | 링크 `KrdsLink` · 버튼 `KrdsButton`                                                                                                                                                                                                                                                            |
| 선택             | 라디오 버튼 `KrdsRadio` · 체크박스 `KrdsCheckbox` · 셀렉트 `KrdsSelect` · 태그 `KrdsTag` · 토글 스위치 `KrdsToggleSwitch`                                                                                                                                                                      |
| 피드백           | 단계 표시기 `KrdsStepIndicator` · 스피너 `KrdsSpinner`                                                                                                                                                                                                                                         |
| 도움             | 도움 패널·따라하기 패널 `KrdsPanel` · 맥락적 도움말 `KrdsContextualHelp` · 코치마크 `KrdsCoachMark` · 툴팁 `KrdsTooltip` · 음성지원 `KrdsTts`                                                                                                                                                  |
| 입력             | 텍스트 입력 필드 `KrdsInput` · 텍스트 영역 `KrdsTextarea` · 날짜 입력 필드 `KrdsDateInput` · 파일 업로드 `KrdsFileUpload`                                                                                                                                                                      |
| 설정             | 언어 변경 `KrdsLanguageSwitcher` · 화면 크기 조정 `KrdsResize`                                                                                                                                                                                                                                 |
| 콘텐츠           | 숨긴 콘텐츠 `v-sr-only` 디렉티브                                                                                                                                                                                                                                                               |

공식 목록 외 부가 컴포넌트: `KrdsLayout`, `KrdsIcon`, `KrdsButtonGroup`, `KrdsTagGroup`, `KrdsCheckArea`, `KrdsStep`, `KrdsFormGroup`, `KrdsFormLabel`, `KrdsFormHint`

### 미제공 항목

- **플로팅 버튼(FAB)**: 미구현입니다.
- **이미지**: Storybook에 안내 문서만 제공합니다.
- **모바일 계열**(범위슬라이드, 뒤로가기 버튼, 바텀시트, 수량 토글, 토스트, 스낵바): 미구현이며, 탭바·스플래시 스크린은 Storybook에 안내 문서만 제공합니다.
- **파비콘, 접근 가능한 미디어**: 컴포넌트가 아닌 가이드 항목이라 포팅 대상이 아닙니다.

### 원본 동기화 기준

- [KRDS 원본 저장소](https://github.com/KRDS-uiux/krds-uiux) v1.1.0 (2025-06-03 커밋 `d6bb184`) 기준으로 포팅되었습니다.
- Alert, Grid, Card, Progress는 원본 저장소에 HTML/SCSS가 존재하지 않아 포팅 대상이 아닙니다 (2026-08-12 원본 main 브랜치 전수 확인).

## 요구사항

- **Runtime**: Vue `^3.5.0`
- **Module system**: ESM
- **Development**: Node.js `>=24.0.0`, pnpm `>=11.0.0`

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
