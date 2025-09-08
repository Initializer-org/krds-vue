# KRDS Vue

KRDS Vue Design System - 한국 정부 디자인 시스템 Vue 컴포넌트 라이브러리

## 설치

```bash
npm install @krds.ui/vue
# or
pnpm add @krds.ui/vue
# or
yarn add @krds.ui/vue
```

## 사용법

### CSS 스타일 가져오기

KRDS Vue를 사용하기 전에 CSS 스타일을 가져와야 합니다:

```javascript
import "@krds.ui/vue/dist/style.css";
```

### 컴포넌트 사용하기

```vue
<template>
  <div>
    <KrdsButton variant="primary" @click="handleClick">
      버튼 텍스트
    </KrdsButton>
  </div>
</template>

<script setup>
import { KrdsButton } from '@krds.ui/vue';

const handleClick = () => {
  console.log('클릭됨');
};
</script>
```

## 특징

- Vue 3 호환
- TypeScript 지원
- 한국 정부 디자인 시스템 준수
- 접근성(a11y) 고려
- 다양한 UI 컴포넌트 제공

## 라이센스

MIT

## 기여

버그 리포트나 기능 요청은 [GitHub Issues](https://github.com/Initializer-org/krds-vue/issues)에 제출해 주세요.

## 지원

- Node.js >= 20.0.0
- Vue >= 3.5.0