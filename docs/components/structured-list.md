<script setup>
import Basic from './demos/structured-list/Basic.vue'
import SimpleBadge from './demos/structured-list/SimpleBadge.vue'
</script>

# 구조화 목록 Structured list

구조화 목록은 유사하거나 관련된 콘텐츠 집합을 표현하기 위한 형식으로 목록에 제공된 데이터에 대한 상세 정보 탐색 수단 또는 관련 기능 실행 수단으로 활용된다. 사용자가 콘텐츠를 효율적으로 탐색하고 다음 행동을 빠르게 결정할 수 있도록 목록 내 정보는 상세 페이지에서 제공되는 복잡한 콘텐츠 중 핵심적이거나 흥미를 끌 수 있는 정보를 논리적 흐름에 따라 조직화하여 명확한 위계 구조를 반영해 제공해야 한다.

## 기본

`cardTop`, `cardBody`, `cardBtm`, `cardBtn` 슬롯으로 카드의 각 영역을 채웁니다. 내용을 넣은 슬롯의 영역만 렌더됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/structured-list/Basic.vue

## 뱃지만 있는 구조

<div class="demo vp-raw"><SimpleBadge /></div>

<<< ./demos/structured-list/SimpleBadge.vue

## 표형

같은 목록을 표로 보여 주는 형태입니다(원본 KRDS v1.1.0). 목록 위 도구 막대(`.search-list-top`)에 전체선택·일괄 작업 버튼과 목록 표시 개수·정렬 기준을 두고, 아래에 표와 페이지네이션을 둡니다. 정렬 기준은 PC에서 버튼, 모바일에서 셀렉트로 바뀝니다. 표는 `KrdsTable`의 [셀 슬롯](/components/table#셀-슬롯)으로 행마다 체크박스와 다운로드 버튼을 넣고, 도구 막대의 체크박스·버튼·셀렉트와 페이지네이션도 컴포넌트로 조합합니다. 전체선택은 지금 페이지의 행 기준입니다.

넓은 화면을 전제로 한 형태라 예제를 1200px 폭의 별도 화면(iframe)에 띄웁니다.

<DemoFrame src="/frame/structured-list/table" title="구조화 목록 표형 예제" :height="360" :width="1200" />

<<< ./demos/structured-list/TableType.vue

## API

## KrdsStructuredList

<ComponentApi name="KrdsStructuredList" />
