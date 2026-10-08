<script setup>
import Basic from './demos/breadcrumb/Basic.vue'
</script>

# 브레드크럼 Breadcrumb

브레드크럼은 탐색 계층 구조를 표시하여 사용자가 현재 위치를 파악하고 계층 구조의 수준을 이동할 수 있게 해준다. 브레드크럼을 통해 사용자는 탐색 중인 화면의 상위 수준 화면으로 이동할 수 있다.

## 기본

`items`의 첫 항목은 홈 아이콘과 함께 표시되고(`showHomeIcon`), 마지막 항목은 현재 페이지(`aria-current="page"`)로 표시됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/breadcrumb/Basic.vue

## API

## KrdsBreadcrumb

<ComponentApi name="KrdsBreadcrumb" />
