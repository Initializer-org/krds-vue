---
layout: home
title: KRDS Vue
titleTemplate: 대한민국 정부 디자인 시스템 Vue 3 컴포넌트 라이브러리

hero:
  name: KRDS Vue
  text: 대한민국 정부 디자인 시스템을 Vue 3로
  tagline: KRDS 원본의 마크업·스타일·키보드 동작을 그대로 따르는 Vue 3 + TypeScript 컴포넌트 라이브러리
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
    details: KRDS 원본 저장소 v1.1.0의 마크업·클래스·인터랙션을 기준으로 포팅했습니다. 공식 컴포넌트 55종 중 43종을 포함해 50개 컴포넌트를 제공합니다.
  - title: 접근성 자동 검사
    details: 모든 컴포넌트 테스트가 실제 브라우저에서 axe-core 접근성 검사를 실행하고, 위반이 있으면 CI가 실패합니다. 고대비 모드를 지원합니다.
  - title: 필요한 만큼만
    details: ESM·Tree-shaking으로 쓰는 컴포넌트만 번들에 포함됩니다. TypeScript 타입 정의와 Nuxt 서버 렌더링을 지원합니다.
---

<script setup>
import HomeShowcase from './.vitepress/theme/HomeShowcase.vue'
</script>

## 컴포넌트 미리보기

공공 서비스 화면을 KRDS Vue 컴포넌트로 조합한 예시입니다. 직접 입력하고 선택해 보세요. 상단 테마 전환 버튼으로 고대비 모드도 확인할 수 있습니다.

<HomeShowcase />

## KRDS Vue란?

KRDS Vue는 [KRDS(대한민국 정부 디자인 시스템, Korea Digital Service Design System)](https://www.krds.go.kr/html/site/index.html) 가이드를 Vue 3 + TypeScript 환경에서 사용할 수 있도록 구현한 오픈소스 컴포넌트 라이브러리입니다. 공공 웹서비스에서 반복되는 헤더·메인 메뉴 같은 아이덴티티·탐색 요소, 텍스트 입력 필드·날짜 입력 필드·파일 업로드 같은 입력 요소, 모달·탭·표 같은 레이아웃 요소를 KRDS 원본 마크업과 스타일 그대로 Vue 컴포넌트로 제공합니다.

```sh
npm install @krds.ui/vue
```

- [시작하기](/guide/getting-started): 설치, 전역 등록·개별 import, Nuxt, TypeScript 설정
- [컴포넌트 목록](/components/): KRDS 공식 분류별 컴포넌트 예제와 API
- [GitHub](https://github.com/Initializer-org/krds-vue) · [npm](https://www.npmjs.com/package/@krds.ui/vue)
