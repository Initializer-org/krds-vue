<script setup>
import Basic from './demos/modal/Basic.vue'
import Sizes from './demos/modal/Sizes.vue'
import NoBackdrop from './demos/modal/NoBackdrop.vue'
import Full from './demos/modal/Full.vue'
import BottomSheet from './demos/modal/BottomSheet.vue'
import Persistent from './demos/modal/Persistent.vue'
</script>

# 모달 Modal

모달은 대화창의 한 종류로 기본 창에 종속된 요소이다. 기본 창과 겹쳐져 가장 상단에 표시되며, 이때 기본 창은 비활성 상태로 전환되어 상호작용이 불가능하므로 사용자는 모달에서의 단일한 과업 또는 메시지에 집중할 수 있다.

<DocTabs>
<template #overview>

## 기본

`v-model`로 열림 상태를 제어합니다. 열리면 모달 안으로 포커스가 이동하고 Tab 키 포커스가 모달 안에서 순환하며, Esc 키나 배경 클릭으로 닫으면 연 버튼으로 포커스가 돌아갑니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/modal/Basic.vue

## 사이즈

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/modal/Sizes.vue

## 배경 없음

<div class="demo vp-raw"><NoBackdrop /></div>

<<< ./demos/modal/NoBackdrop.vue

## 풀팝업

<div class="demo vp-raw"><Full /></div>

<<< ./demos/modal/Full.vue

## 바텀시트

<div class="demo vp-raw"><BottomSheet /></div>

<<< ./demos/modal/BottomSheet.vue

## Persistent

중요한 결정을 받아야 할 때 배경 클릭과 Esc 키로 닫히지 않게 합니다.

<div class="demo vp-raw"><Persistent /></div>

<<< ./demos/modal/Persistent.vue

</template>
<template #api>

### KrdsModal

<ComponentApi name="KrdsModal" />

</template>
</DocTabs>
