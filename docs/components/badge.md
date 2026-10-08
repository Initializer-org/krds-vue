<script setup>
import Basic from './demos/badge/Basic.vue'
import All from './demos/badge/All.vue'
import NumberBadge from './demos/badge/NumberBadge.vue'
</script>

# 배지 Badge

컴포넌트에 대한 빠른 인지와 탐색을 돕기 위해 컴포넌트 근처에 표시되는 작은 문자 또는 숫자 데이터이다. 컴포넌트의 분류 체계, 구조화된 정보, 상태 정보, 기타 메타 데이터를 표시할 수 있으며 사용자의 주의를 끌기 위해 색상을 활용할 수 있다.

## 기본

속성을 지정하지 않으면 `type="outline"`, `color="primary"`, `size="large"`로 표시됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/badge/Basic.vue

## 기본 전체

`type`(`outline`, `bg`, `bg-light`)과 `color`의 조합입니다. 행마다 `size`를 `large`, `medium`, `small`로 달리했습니다.

<div class="demo vp-raw"><All /></div>

<<< ./demos/badge/All.vue

## 넘버 배지

<div class="demo vp-raw"><NumberBadge /></div>

<<< ./demos/badge/NumberBadge.vue

## API

## KrdsBadge

<ComponentApi name="KrdsBadge" />
