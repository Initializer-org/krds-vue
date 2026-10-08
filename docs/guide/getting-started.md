# 시작하기

KRDS Vue는 [KRDS(대한민국 정부 디자인 시스템)](https://www.krds.go.kr/html/site/index.html)를 Vue 3 + TypeScript 환경에서 사용할 수 있도록 구현한 컴포넌트 라이브러리입니다. 이 패키지는 **ESM 전용**이며 CommonJS `require()`는 지원하지 않습니다.

## 설치

::: code-group

```sh [pnpm]
pnpm add @krds.ui/vue
```

```sh [npm]
npm install @krds.ui/vue
```

```sh [yarn]
yarn add @krds.ui/vue
```

:::

## 스타일

애플리케이션 엔트리에서 스타일을 한 번 import합니다. CSS 안의 아이콘 URL은 패키지의 `dist/img` 자산을 기준으로 상대 경로를 사용합니다.

```ts
import '@krds.ui/vue/style'
```

## 전역 플러그인 등록

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

전역 등록한 컴포넌트의 템플릿 타입 검사·자동완성(Volar/vue-tsc)을 쓰려면 `tsconfig.json`에 전역 타입을 추가합니다. 전체 컴포넌트와 `v-sr-only`, `$krds`가 전역으로 선언되므로 일부만 등록했다면 등록하지 않은 컴포넌트 사용에 주의하세요.

```json
{
  "compilerOptions": {
    "types": ["@krds.ui/vue/global"]
  }
}
```

## 개별 컴포넌트 import

전역 등록이 필요 없다면 필요한 컴포넌트만 가져옵니다. 이 문서의 예제도 모두 이 방식으로 작성되어 있어 그대로 복사해 쓸 수 있습니다.

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsFormGroup, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'

  const name = ref('')
</script>

<template>
  <KrdsFormGroup>
    <KrdsFormLabel for="name">이름</KrdsFormLabel>
    <KrdsInput id="name" v-model="name" placeholder="이름을 입력하세요" required />
  </KrdsFormGroup>

  <KrdsButton variant="primary" size="medium">확인</KrdsButton>
</template>
```

## Nuxt

서버 렌더링을 지원합니다. 스타일은 `nuxt.config.ts`에 추가하고, 플러그인에서 등록합니다.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@krds.ui/vue/style']
})
```

```ts
// plugins/krds.ts (Nuxt 4 기본 구조에서는 app/plugins/krds.ts)
import KrdsVue from '@krds.ui/vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(KrdsVue)
})
```

Nuxt는 tsconfig를 자동 생성하므로, 전역 타입은 프로젝트의 `.d.ts` 파일에 참조를 추가합니다.

```ts
// types/krds.d.ts
/// <reference types="@krds.ui/vue/global" />
```

## 예제 프로젝트

이 문서의 설정(플러그인 등록, 스타일, 전역 타입)을 담은 Vite + Vue 3 + TypeScript 예제가 저장소의 [`examples/vite`](https://github.com/Initializer-org/krds-vue/tree/main/examples/vite)에 있습니다. [StackBlitz에서 바로 열어](https://stackblitz.com/github/Initializer-org/krds-vue/tree/main/examples/vite) 볼 수도 있습니다.

## TypeScript

컴포넌트 props와 공통 타입을 패키지 루트에서 가져올 수 있습니다.

```ts
import type { KrdsButtonProps, Size } from '@krds.ui/vue'

const size: Size = 'medium'

const buttonProps: KrdsButtonProps = {
  variant: 'primary',
  size,
  disabled: false
}
```

## 스타일과 테마

KRDS Vue 스타일은 CSS custom properties를 기반으로 합니다. 토큰 값을 조정해야 한다면 원본 CSS를 수정하지 말고 애플리케이션 CSS에서 필요한 변수만 재선언합니다.

```css
:root {
  --krds-color-light-primary-50: #256ef4;
}
```

컬러 모드는 루트 요소의 `data-krds-mode` 속성으로 전환합니다. 이 문서 사이트 상단의 화면 모드 버튼도 같은 방식으로 고대비 모드를 켭니다.

```ts
document.documentElement.setAttribute('data-krds-mode', 'high-contrast')
```

- `light`: 기본 라이트 모드 (KRDS 공식 사이트의 "기본 (밝은 배경)")
- `high-contrast`: 고대비 모드 (KRDS 공식 사이트의 "선명하게 (어두운 배경)")
- `theme`: 사용자 시스템 설정에 따라 라이트/고대비 스타일 적용 (KRDS 공식 사이트의 "시스템 설정")

## 브라우저 지원

| 브라우저          | 지원 버전 |
| ----------------- | --------- |
| Chrome, Edge      | 111 이상  |
| Firefox           | 114 이상  |
| Safari (iOS 포함) | 16.4 이상 |

산출물에 폴리필은 포함하지 않습니다. Internet Explorer는 지원하지 않습니다.
