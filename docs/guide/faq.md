---
title: KRDS Vue 자주 묻는 질문
description: 'KRDS Vue의 공식 프로젝트와의 관계, 설치 패키지명, Vue 지원 범위, Nuxt SSR, 전역 타입, 스타일과 접근성 검증 범위를 설명합니다.'
---

# KRDS Vue 자주 묻는 질문

KRDS Vue는 Initializer Team이 유지보수하는 `@krds.ui/vue`입니다. 대한민국 정부 디자인 시스템의 마크업·스타일·키보드 동작을 Vue 3와 TypeScript로 구현한 커뮤니티 라이브러리입니다.

## 정부가 배포하는 공식 Vue 패키지인가요? {#official-package}

아닙니다. 이 프로젝트는 [KRDS 공식 가이드](https://www.krds.go.kr/html/site/index.html)를 따르지만 Initializer Team이 별도로 유지보수합니다. 구현 소스와 변경 이력은 [krds-vue 저장소](https://github.com/Initializer-org/krds-vue)에서 확인할 수 있습니다.

## 어떤 패키지를 설치하고 어떤 Vue 버전을 써야 하나요? {#installation}

`pnpm add @krds.ui/vue`로 설치합니다. Vue 지원 범위는 `^3.5.0`, 즉 3.5.0 이상이면서 4.0.0 미만입니다. Vue 2는 지원하지 않습니다. ESM 전용 패키지이므로 CommonJS `require()` 대신 `import`를 사용하세요. 전체 설정은 [시작하기](/guide/getting-started)에 있습니다.

## Nuxt에서 서버 렌더링을 사용할 수 있나요? {#nuxt}

사용할 수 있습니다. `nuxt.config.ts`의 `css`에 `@krds.ui/vue/style`을 추가하고 Nuxt 플러그인에서 `nuxtApp.vueApp.use(KrdsVue)`로 등록합니다. 플러그인 경로는 Nuxt 3에서 `plugins/krds.ts`, Nuxt 4의 기본 구조에서 `app/plugins/krds.ts`입니다. [Nuxt 설정 예제](/guide/getting-started#nuxt)와 저장소의 [SSR 검사](https://github.com/Initializer-org/krds-vue/blob/main/scripts/ssr-smoke.mjs)를 참고하세요.

## 전역 등록 없이 필요한 컴포넌트만 쓸 수 있나요? {#imports}

사용할 수 있습니다. Vue SFC의 `<script setup>`에서 필요한 컴포넌트만 가져오면 됩니다. 전역 플러그인을 등록하지 않아도 되며, 스타일은 애플리케이션 엔트리에서 한 번 불러옵니다.

```vue
<script setup lang="ts">
  import { KrdsButton } from '@krds.ui/vue'
</script>

<template>
  <KrdsButton variant="primary">신청하기</KrdsButton>
</template>
```

## 전역 컴포넌트의 TypeScript 자동완성은 어떻게 설정하나요? {#typescript}

플러그인으로 전역 등록했다면 `tsconfig.json`의 `compilerOptions.types`에 `@krds.ui/vue/global`을 추가합니다. Nuxt에서는 프로젝트의 `.d.ts` 파일에 `/// <reference types="@krds.ui/vue/global" />`를 추가합니다. 이 타입은 전체 컴포넌트를 선언하므로 일부만 등록한 앱에서는 실제 등록 여부를 따로 확인해야 합니다. [전역 등록 안내](/guide/getting-started#전역-플러그인-등록)에 전체 예제가 있습니다.

## 스타일이 적용되지 않으면 어떻게 하나요? {#styles}

애플리케이션 엔트리에 `import '@krds.ui/vue/style'`이 있는지 확인하세요. CSS의 아이콘 URL은 패키지의 `dist/img`를 기준으로 하므로 CSS만 별도 경로로 복사하면 자산 연결이 끊길 수 있습니다. 고대비 모드는 루트 요소에 `data-krds-mode="high-contrast"`를 지정합니다. [스타일과 테마](/guide/getting-started#스타일과-테마)에서 설정을 확인하세요.

## 이 라이브러리를 쓰면 웹 접근성 인증을 받은 것인가요? {#accessibility}

아닙니다. 컴포넌트 테스트의 axe-core 검사는 구현 오류를 찾는 자동 검사이며 웹 접근성 인증을 대신하지 않습니다. 실제 서비스의 레이블, 키보드 이동, 화면낭독기 흐름과 콘텐츠는 별도로 검증해야 합니다. 검사 구성은 [CI 워크플로](https://github.com/Initializer-org/krds-vue/blob/main/.github/workflows/ci.yml)에서 확인할 수 있습니다.

## 라이선스와 AI 도구용 문서는 어디에 있나요? {#license-and-ai}

코드는 [MIT 라이선스](https://github.com/Initializer-org/krds-vue/blob/main/LICENSE)로 배포됩니다. AI 도구에 전달할 지침, 문서 목차와 전체 API는 [AI로 개발하기](/guide/ai)에서 제공합니다. 컴포넌트별 원문은 [컴포넌트 목록](/components/)에서 확인할 수 있습니다.
