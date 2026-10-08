<script setup>
import Basic from './demos/radio/Basic.vue'
</script>

# 라디오 버튼 Radio button

라디오 버튼은 사용자가 여러 개의 옵션 중 하나만 선택할 수 있도록 하는 경우에 사용한다. 즉, 라디오 버튼 옵션의 선택은 상호배타적이므로 한 개의 옵션을 선택하면 다른 옵션은 자동으로 선택 해제된다.

<DocTabs>
<template #overview>

## 기본

같은 그룹의 라디오는 같은 `name`과 `v-model`을 쓰고, `modelValue`가 `value`와 같은 라디오가 선택됩니다. `description` 슬롯으로 부가 설명을 넣을 수 있고, `KrdsCheckArea`의 `column`으로 세로로 배치합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/radio/Basic.vue

</template>
<template #api>

## KrdsRadio

<ComponentApi name="KrdsRadio" />

## KrdsCheckArea

<ComponentApi name="KrdsCheckArea" />

</template>
</DocTabs>
