<script setup>
import Basic from './demos/tts/Basic.vue'
import IconOnly from './demos/tts/IconOnly.vue'
import Sizes from './demos/tts/Sizes.vue'
import IconTypes from './demos/tts/IconTypes.vue'
import Disabled from './demos/tts/Disabled.vue'
</script>

# 음성 지원 TTS

TTS(Text-to-Speech)는 텍스트를 음성으로 변환하여 읽어주는 기능을 제공하는 버튼 컴포넌트이다. Web Speech API를 사용하며, 볼륨 아이콘과 재생 아이콘 두 가지 타입을 지원한다.

<DocTabs>
<template #overview>

## 기본

버튼을 누르면 `text`를 한국어(`ko-KR`)로 읽고, 읽는 동안 정지 아이콘으로 바뀌어 다시 누르면 멈춥니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/tts/Basic.vue

## 아이콘만

`label`이 없으면 아이콘만 표시되므로 `aria-label`로 버튼 이름을 제공합니다.

<div class="demo vp-raw"><IconOnly /></div>

<<< ./demos/tts/IconOnly.vue

## 크기

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/tts/Sizes.vue

## 아이콘 타입

<div class="demo vp-raw"><IconTypes /></div>

<<< ./demos/tts/IconTypes.vue

## 비활성화

<div class="demo vp-raw"><Disabled /></div>

<<< ./demos/tts/Disabled.vue

</template>
<template #api>

### KrdsTts

<ComponentApi name="KrdsTts" />

</template>
</DocTabs>
