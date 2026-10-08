<script setup>
import Basic from './demos/accordion/Basic.vue'
import Line from './demos/accordion/Line.vue'
</script>

# 아코디언 Accordion

아코디언은 한 페이지에서 관련 있는 여러 콘텐츠 섹션을 확인할 수 있도록 하는 컴포넌트로 콘텐츠 섹션의 헤더 목록이 수직으로 쌓여 있는 형태로 표현된다. 일반적으로 헤더 목록은 컨트롤 요소로 활용되며 사용자는 필요에 따라 헤더를 선택하여 하위 콘텐츠 섹션을 표시하거나 숨길 수 있다.

<DocTabs>
<template #overview>

## 기본

`KrdsAccordionGroup` 안에 `KrdsAccordionItem`을 둡니다. 열린 항목의 `id`를 `open-item`으로 내려 주고 `toggle` 이벤트로 받은 `id`로 갱신합니다. 예제처럼 같은 `id`를 다시 받으면 닫도록 하면 한 번에 한 항목만 열립니다.

`id`는 항목 요소의 id와 `accordion-header-{id}`, `accordion-collapse-{id}`에 그대로 쓰이므로 페이지 안에서 고유해야 합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/accordion/Basic.vue

## 라인

`type-line`을 지정하면 라인형으로 표시됩니다. 제목과 본문은 `title`, `content` 속성 대신 같은 이름의 슬롯으로도 넣을 수 있습니다.

<div class="demo vp-raw"><Line /></div>

<<< ./demos/accordion/Line.vue

</template>
<template #api>

### KrdsAccordionGroup

<ComponentApi name="KrdsAccordionGroup" />

### KrdsAccordionItem

<ComponentApi name="KrdsAccordionItem" />

</template>
</DocTabs>
