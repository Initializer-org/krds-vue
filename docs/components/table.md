<script setup>
import Basic from './demos/table/Basic.vue'
import RowClick from './demos/table/RowClick.vue'
import StyleAndClass from './demos/table/StyleAndClass.vue'
import NoData from './demos/table/NoData.vue'
import NoDataSlot from './demos/table/NoDataSlot.vue'
</script>

# 표 Table

표는 데이터를 하나 이상의 행과 열로 조직화하여 표현하는 형식으로 사용자가 빠르게 많은 양의 정보를 확인하고 비교할 수 있도록 도와준다. 기본적으로 대화형 요소가 아니기 때문에 열 제목에 데이터를 정렬하기 위한 컨트롤 요소가 포함된 상황 외에 행 전체나 데이터 셀이 대화형으로 작동하지 않는다.

<DocTabs>
<template #overview>

## 기본 테이블

`columns`로 열을, `rows`로 행 데이터를 정의합니다. 각 행의 첫 번째 셀은 행 제목(`th scope="row"`)으로 렌더되고, `headerStyle`의 `width`는 `colgroup`의 열 너비로도 쓰입니다. KRDS 표 스타일은 `class`에 `data`가 있을 때 적용되므로 원본 KRDS 마크업처럼 `col data`를 지정합니다. `caption`은 화면에 보이지 않고 스크린 리더로 읽히므로 표의 구성을 설명하는 문장으로 씁니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/table/Basic.vue

## 행 클릭

`row-click` 리스너가 있을 때만 행이 포커스를 받고(`tabindex="0"`) 클릭이나 Enter·Space 키로 선택됩니다. 리스너가 없으면 행은 대화형으로 동작하지 않습니다.

<div class="demo vp-raw"><RowClick /></div>

<<< ./demos/table/RowClick.vue

## 스타일 & 클래스 기능

열마다 헤더 셀에는 `headerStyle`·`headerClasses`를, 바디 셀에는 `style`·`classes`를 지정합니다. 바디 셀의 `style`·`classes`는 행 데이터를 받는 함수로도 줄 수 있습니다. `align`을 지정하면 헤더와 바디 셀에 `text-<align>` 클래스가 붙습니다. 클래스의 스타일은 앱의 CSS에서 정의합니다.

<div class="demo vp-raw"><StyleAndClass /></div>

<<< ./demos/table/StyleAndClass.vue

## 빈 데이터 (기본)

`rows`가 비어 있으면 모든 열을 합친 셀에 "데이터가 없습니다."를 표시합니다.

<div class="demo vp-raw"><NoData /></div>

<<< ./demos/table/NoData.vue

## 빈 데이터 (커스텀 슬롯)

`no-data` 슬롯으로 빈 상태 내용을 바꿉니다.

<div class="demo vp-raw"><NoDataSlot /></div>

<<< ./demos/table/NoDataSlot.vue

</template>
<template #api>

### KrdsTable

<ComponentApi name="KrdsTable" />

</template>
</DocTabs>
