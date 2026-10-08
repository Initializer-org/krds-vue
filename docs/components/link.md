<script setup>
import Basic from './demos/link/Basic.vue'
import Variations from './demos/link/Variations.vue'
</script>

# 링크 Link

링크는 다른 서비스/애플리케이션, 한 서비스 내의 다른 화면, 한 화면 내의 다른 섹션 등으로 이동하는 데 사용되는 탐색 요소이다.

<DocTabs>
<template #overview>

## 기본

`target="_blank"`이면 `rel="noopener noreferrer"`가 자동으로 붙습니다. 새 창으로 열리는 링크는 `title`로 그 사실을 알립니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/link/Basic.vue

## 모든 링크 변형

<div class="demo vp-raw"><Variations /></div>

<<< ./demos/link/Variations.vue

</template>
<template #api>

### KrdsLink

<ComponentApi name="KrdsLink" />

</template>
</DocTabs>
