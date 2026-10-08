<script setup>
import Basic from './demos/checkbox/Basic.vue'
import Sizes from './demos/checkbox/Sizes.vue'
import Chip from './demos/checkbox/Chip.vue'
</script>

# 체크박스 Checkbox

체크박스는 사용자가 여러 개의 옵션 중 한 개 이상의 값을 선택할 수 있도록 하는 경우에 사용한다. 즉, 체크박스 옵션의 선택은 상호배타적이므로 한 개의 옵션을 선택하는 것은 다른 옵션의 선택에 영향을 미치지 않는다.

<DocTabs>
<template #overview>

## 기본

`v-model`로 선택 상태(`boolean`)를 연결합니다. `description` 슬롯으로 부가 설명을 넣을 수 있고, `KrdsCheckArea`의 `column`으로 세로로 배치합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/checkbox/Basic.vue

## 사이즈

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/checkbox/Sizes.vue

## Chip

`chip`을 지정하면 칩 모양으로 표시됩니다. 칩 스타일에서는 `description` 슬롯이 표시되지 않습니다.

<div class="demo vp-raw"><Chip /></div>

<<< ./demos/checkbox/Chip.vue

</template>
<template #api>

## KrdsCheckbox

<ComponentApi name="KrdsCheckbox" />

## KrdsCheckArea

<ComponentApi name="KrdsCheckArea" />

</template>
</DocTabs>
