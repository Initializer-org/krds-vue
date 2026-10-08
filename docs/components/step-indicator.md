<script setup>
import Basic from './demos/step-indicator/Basic.vue'
import ForcedStatus from './demos/step-indicator/ForcedStatus.vue'
import WithPageTitle from './demos/step-indicator/WithPageTitle.vue'
</script>

# 단계 표시기 Step indicator

단계 표시기는 서비스 이용을 위해 사용자가 거쳐야 하는 일련의 단계를 시각화하여 표현한 것으로 진행 상태에 대한 피드백을 사용자에게 전달한다.

<DocTabs>
<template #overview>

## 기본

`modelValue`에 현재 단계의 인덱스(0부터 시작)를 지정합니다. 그보다 앞의 단계는 완료(`done`), 뒤의 단계는 대기(`pending`) 상태로 표시됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/step-indicator/Basic.vue

## 상태 지정

`KrdsStep`의 `status`로 단계의 상태를 직접 지정합니다. `status`는 `modelValue`로 계산한 상태보다 우선합니다.

<div class="demo vp-raw"><ForcedStatus /></div>

<<< ./demos/step-indicator/ForcedStatus.vue

## 페이지 타이틀과 함께

<div class="demo vp-raw"><WithPageTitle /></div>

<<< ./demos/step-indicator/WithPageTitle.vue

</template>
<template #api>

### KrdsStepIndicator

<ComponentApi name="KrdsStepIndicator" />

### KrdsStep

<ComponentApi name="KrdsStep" />

</template>
</DocTabs>
