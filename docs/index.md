---
layout: home
title: KRDS Vue (@krds.ui/vue)
titleTemplate: 대한민국 정부 디자인 시스템 Vue 3 컴포넌트 라이브러리
description: 'Initializer Team의 @krds.ui/vue 문서입니다. Vue 3.5 이상에서 쓰는 KRDS 컴포넌트 설치, Nuxt SSR 설정, TypeScript API와 예제를 제공합니다.'

hero:
  name: KRDS Vue
  text: 대한민국 정부 디자인 시스템을 Vue 3로
  tagline: 민원 신청부터 본인 인증까지, 공공서비스에 필요한 화면을 KRDS 기준으로 구성하세요. 폼·내비게이션·안내 요소를 Vue 프로젝트에서 조합해 사용할 수 있습니다.
  actions:
    - theme: brand
      text: 시작하기
      link: /guide/getting-started
    - theme: alt
      text: 컴포넌트 보기
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/Initializer-org/krds-vue

features:
  - title: KRDS 원본 그대로
    details: KRDS 원본 저장소 v1.1.0의 마크업·클래스·인터랙션을 기준으로 포팅했습니다. 공식 컴포넌트 55종 중 52종을 포함해 58개 컴포넌트를 제공합니다.
  - title: 접근성 자동 검사
    details: 모든 컴포넌트 테스트가 실제 브라우저에서 axe-core 접근성 검사를 실행하고, 위반이 있으면 CI가 실패합니다. 고대비 모드를 지원합니다.
  - title: 필요한 만큼만
    details: ESM·Tree-shaking으로 쓰는 컴포넌트만 번들에 포함됩니다. TypeScript 타입 정의와 Nuxt 서버 렌더링을 지원합니다.
---

<script setup>
import HomeShowcase from './.vitepress/theme/HomeShowcase.vue'
</script>

## KRDS Vue는 무엇인가요? {#about}

KRDS Vue(`@krds.ui/vue`)는 대한민국 정부 디자인 시스템의 마크업·스타일·키보드 동작을 Vue 3로 구현한 커뮤니티 라이브러리입니다. Initializer Team이 유지보수하며, 정부가 배포하는 공식 Vue 패키지는 아닙니다. Vue 3.5 이상(4 미만)과 ESM 환경을 지원하고 MIT 라이선스로 배포됩니다.

```sh
npm install @krds.ui/vue
```

[npm: @krds.ui/vue](https://www.npmjs.com/package/@krds.ui/vue) · [소스: Initializer-org/krds-vue](https://github.com/Initializer-org/krds-vue) · [패키지 이름 구분하기](/guide/faq#package-names)

[설치와 Nuxt 설정](/guide/getting-started), [컴포넌트별 예제와 API](/components/), [자주 묻는 질문](/guide/faq)에서 적용 방법을 확인하세요. AI 코딩 도구용 문서는 [AI로 개발하기](/guide/ai)에서 제공합니다.

## 컴포넌트 미리보기

공공 서비스 화면을 KRDS Vue 컴포넌트로 조합한 예시입니다. 직접 입력하고 선택해 보세요. 상단 화면 모드 버튼으로 "선명하게 (어두운 배경)" 모드도 확인할 수 있습니다.

<HomeShowcase />
