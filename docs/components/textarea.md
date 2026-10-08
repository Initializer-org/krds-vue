<script setup>
import Basic from './demos/textarea/Basic.vue'
</script>

# 텍스트 영역 Textarea

텍스트 영역은 사용자가 키보드로 글자, 숫자, 기호 등이 조합된 여러 줄의 텍스트를 입력하는 경우에 사용하는 요소이다.

<DocTabs>
<template #overview>

## 기본

입력한 글자 수가 오른쪽 아래에 표시됩니다(`showCount`, 기본값 `true`). `maxlength`를 지정하면 최대 글자 수도 함께 표시됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/textarea/Basic.vue

</template>
<template #api>

## KrdsTextarea

<ComponentApi name="KrdsTextarea" />

</template>
</DocTabs>
