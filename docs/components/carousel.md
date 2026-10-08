<script setup>
import Basic from './demos/carousel/Basic.vue'
import Banner from './demos/carousel/Banner.vue'
import Autoplay from './demos/carousel/Autoplay.vue'
import NoLoop from './demos/carousel/NoLoop.vue'
import Fraction from './demos/carousel/Fraction.vue'
</script>

# 캐러셀 Carousel

캐러셀은 하나의 영역에서 여러 개의 콘텐츠를 순차적으로 번갈아 보여주는 컴포넌트이다. 한정된 공간에 여러 콘텐츠를 노출할 수 있으나 첫 번째 슬라이드 외에는 주목도가 크게 떨어지므로, 중요한 정보는 캐러셀에만 담지 않는 것이 좋다. 슬라이드는 기본 슬롯으로 전달하며 최상위 노드 하나가 슬라이드 한 장이 된다. 자동 재생 시에는 사용자가 즉시 정지할 수 있도록 재생/정지 버튼을 함께 노출한다.

<DocTabs>
<template #overview>

## 기본 (비주얼 배너형)

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/carousel/Basic.vue

## 배너형

배너형은 인디케이터 안에 분수형 페이지네이션과 이전/다음·더 보기 버튼을 배치합니다.

<div class="demo vp-raw"><Banner /></div>

<<< ./demos/carousel/Banner.vue

## 자동 재생

자동 재생 중에는 정지 버튼이 노출되며, 정지하면 재생 버튼으로 바뀝니다. 마우스 오버나 키보드 포커스가 캐러셀 안에 있는 동안에는 자동 재생이 멈춥니다.

<div class="demo vp-raw"><Autoplay /></div>

<<< ./demos/carousel/Autoplay.vue

## 순환 없음

`loop`를 끄면 처음과 마지막 슬라이드에서 이전/다음 버튼이 비활성화됩니다.

<div class="demo vp-raw"><NoLoop /></div>

<<< ./demos/carousel/NoLoop.vue

## 분수형 페이지네이션

페이지네이션 방식은 형태와 무관하게 `pagination` 속성으로 바꿀 수 있습니다.

<div class="demo vp-raw"><Fraction /></div>

<<< ./demos/carousel/Fraction.vue

</template>
<template #api>

## KrdsCarousel

<ComponentApi name="KrdsCarousel" />

</template>
</DocTabs>
