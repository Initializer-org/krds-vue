<script setup>
import Basic from './demos/coach-mark/Basic.vue'
</script>

# 코치마크 Coach mark

코치마크는 사용자에게 새로 도입된 기능을 안내하거나, 여러 단계를 거쳐 수행해야 하는 복잡한 과업을 사용자가 보다 쉽게 완료할 수 있도록 세부 수행 단계별로 고맥락적 도움말을 제공하는 컴포넌트이다.

<DocTabs>
<template #overview>

## 기본

단계마다 `KrdsCoachMark`를 두고 같은 `v-model`을 연결합니다. `v-model` 값이 `active-step`과 같은 코치마크에만 말풍선이 표시되며, 다음으로·이전으로 버튼이 `v-model`을 바꾸고 그만보기 버튼은 `close` 이벤트를 보냅니다. 말풍선은 대상 요소 위쪽에 표시되므로 위에 여백을 둡니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/coach-mark/Basic.vue

</template>
<template #api>

### KrdsCoachMark

<ComponentApi name="KrdsCoachMark" />

</template>
</DocTabs>
