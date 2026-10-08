<script setup>
import Basic from './demos/tag/Basic.vue'
import Sizes from './demos/tag/Sizes.vue'
import Link from './demos/tag/Link.vue'
import WithSlot from './demos/tag/WithSlot.vue'
</script>

# 태그 Tag

태그는 키워드 또는 레이블을 사용하여 콘텐츠를 분류하는 수단이다. 콘텐츠 항목에 직접 관련 분류 체계, 데이터 속성을 표시하거나, 목록에서 특정 분류 체계, 데이터 속성을 가진 항목이 선택되었음을 보여주기 위한 태그 그룹으로 사용된다.

<DocTabs>
<template #overview>

## 기본

링크가 아닌 태그에는 삭제 버튼이 함께 표시되며, 누르면 `remove` 이벤트가 발생합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/tag/Basic.vue

## 사이즈

크기는 `KrdsTagGroup`의 `size`로 지정합니다.

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/tag/Sizes.vue

## 링크 태그

`link`를 지정하면 삭제 버튼 없이 `href`로 이동하는 링크로 렌더링됩니다.

<div class="demo vp-raw"><Link /></div>

<<< ./demos/tag/Link.vue

## 슬롯 사용

`remove` 이벤트에서 목록을 갱신해 태그를 삭제합니다.

<div class="demo vp-raw"><WithSlot /></div>

<<< ./demos/tag/WithSlot.vue

</template>
<template #api>

## KrdsTag

<ComponentApi name="KrdsTag" />

## KrdsTagGroup

<ComponentApi name="KrdsTagGroup" />

</template>
</DocTabs>
