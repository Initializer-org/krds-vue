<script setup>
import Hierarchy from './demos/button/Hierarchy.vue'
import Sizes from './demos/button/Sizes.vue'
import WithIcon from './demos/button/WithIcon.vue'
import Text from './demos/button/Text.vue'
import IconOnly from './demos/button/IconOnly.vue'
</script>

# 버튼 Button

버튼은 어떤 기능이나 동작을 실행하거나 기능을 사용하기 위한 상태로 변경하는 요소이다. 사용자가 서비스를 이용하는 과정에서 어떤 행동이 중요한지에 따라 관련된 버튼이 다양한 스타일로 표현된다.

<DocTabs>
<template #overview>

## 계층

`variant`로 버튼의 중요도를 표현합니다. 화면의 주요 행동에는 `primary`를 한 번만 사용합니다.

<div class="demo vp-raw"><Hierarchy /></div>

<<< ./demos/button/Hierarchy.vue

## 사이즈

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/button/Sizes.vue

## 아이콘 버튼

텍스트 앞이나 뒤에 아이콘을 둘 수 있습니다. 아이콘 크기는 버튼 크기에 맞춰집니다.

<div class="demo vp-raw"><WithIcon /></div>

<<< ./demos/button/WithIcon.vue

## 텍스트 버튼

<div class="demo vp-raw"><Text /></div>

<<< ./demos/button/Text.vue

## 아이콘만 있는 버튼

보이는 텍스트가 없으므로 `sr-only` 텍스트로 버튼 이름을 반드시 제공합니다.

<div class="demo vp-raw"><IconOnly /></div>

<<< ./demos/button/IconOnly.vue

</template>
<template #api>

## KrdsButton

<ComponentApi name="KrdsButton" />

</template>
</DocTabs>
