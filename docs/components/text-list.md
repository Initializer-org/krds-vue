<script setup>
import Basic from './demos/text-list/Basic.vue'
import Ordered from './demos/text-list/Ordered.vue'
</script>

# 텍스트 목록 Text list

텍스트 목록은 계층 구조가 있는 텍스트 블록을 읽기 쉽게 구성한 것이다.

<DocTabs>
<template #overview>

## 기본 (대시)

`type`으로 `ul`·`ol` 요소를, `variant`로 글머리 스타일을 정합니다. 항목(`li`) 안에 `KrdsTextList`를 넣어 3단계까지 중첩합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/text-list/Basic.vue

## 순서 있는 목록

`variant="ordered"`는 번호를 자동으로 붙이지 않으므로 항목마다 `<span class="num">`으로 번호를 직접 씁니다.

<div class="demo vp-raw"><Ordered /></div>

<<< ./demos/text-list/Ordered.vue

</template>
<template #api>

### KrdsTextList

<ComponentApi name="KrdsTextList" />

</template>
</DocTabs>
