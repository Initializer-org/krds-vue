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

## API

### KrdsStructuredList

<ComponentApi name="KrdsStructuredList" />
