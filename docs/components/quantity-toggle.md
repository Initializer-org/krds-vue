<script setup>
import Basic from './demos/quantity-toggle/Basic.vue'
import Vertical from './demos/quantity-toggle/Vertical.vue'
</script>

# 수량 토글 Quantity toggle

수량 토글은 사용자가 수량 옵션을 늘리거나 줄이는 데 사용되며, 한정된 범위 내에서 수량 선택을 위해 사용한다.

## 기본

`v-model`로 수량(`number`)을 연결하고 `label`로 어떤 수량인지 안내합니다. 최솟값(`min`, 기본 0)이나 최댓값(`max`, 기본 10)에 닿으면 해당 버튼이 비활성화됩니다. KRDS 가이드에 따라 선택 범위는 기준값을 포함해 11단계 이내로 정하고, 그보다 넓으면 [텍스트 입력 필드](./input)를 씁니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/quantity-toggle/Basic.vue

## 세로형

`vertical`을 지정하면 + 버튼이 위, − 버튼이 아래에 놓입니다.

<div class="demo vp-raw"><Vertical /></div>

<<< ./demos/quantity-toggle/Vertical.vue

## 접근성

- 수량 값은 [WAI-ARIA spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)입니다. <kbd>Tab</kbd>으로 수량 값에 초점을 옮긴 뒤 <kbd>↑</kbd>/<kbd>↓</kbd>로 1씩, <kbd>Home</kbd>/<kbd>End</kbd>로 최솟값/최댓값을 고릅니다.
- −/+ 버튼은 키보드 조작과 기능이 겹쳐 탭 순서에서 빠지고, 누르면 초점이 수량 값으로 옮겨져 화면낭독기가 바뀐 값을 읽습니다.
- 레이블은 생략하지 않습니다. 화면에서 숨겨야 하면 `hide-label`을 지정합니다(화면낭독기는 읽음).

## API

## KrdsQuantityToggle

<ComponentApi name="KrdsQuantityToggle" />
