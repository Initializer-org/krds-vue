<script setup>
import Basic from './demos/pagination/Basic.vue'
</script>

# 페이지네이션 Pagination

페이지네이션은 많은 양의 콘텐츠를 탐색하기 쉽도록 여러 화면에 나누고, 분할된 화면을 탐색하는 데 사용되는 요소이다.

## 기본

`v-model`로 현재 페이지를, `max`로 전체 페이지 수를 지정합니다. 페이지가 `pageRange`보다 많으면 첫 페이지와 마지막 페이지 사이를 생략 표시로 줄입니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/pagination/Basic.vue

## API

## KrdsPagination

<ComponentApi name="KrdsPagination" />
