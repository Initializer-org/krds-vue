<script setup>
import Basic from './demos/range-slider/Basic.vue'
import ValueEnd from './demos/range-slider/ValueEnd.vue'
</script>

# 범위슬라이드 Range slider

범위 슬라이더는 사용자가 연속된 옵션 범위에서 값을 선택할 수 있도록 하는 경우 사용한다. 사용자가 선택한 값은 선택하는 동안 계속 보이도록 표시하여야 한다.

## 기본

`v-model`로 값(`number`)을 연결하고 `label`로 어떤 값을 고르는지 안내합니다. `min`(기본 0)·`max`(기본 100)·`step`(기본 1)으로 범위와 단계를 정하고, `value-text`로 값을 글자로 바꿉니다. 바꾼 글자는 핸들 위 말풍선, 트랙 아래 범위 값, 화면낭독기가 읽는 값(`aria-valuetext`)에 함께 쓰입니다. 단계가 20개 이하이면 트랙에 단계 눈금이 표시됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/range-slider/Basic.vue

## 슬라이더 끝에 선택 값

`value-position="end"`를 주면 선택 값을 말풍선 대신 슬라이더 오른쪽 끝에 표시합니다. 손가락으로 끄는 동안에도 값이 가려지지 않습니다.

<div class="demo vp-raw"><ValueEnd /></div>

<<< ./demos/range-slider/ValueEnd.vue

## 사용 지침

- 볼륨·밝기·글자 크기처럼 정확한 값보다 상대적인 값이 중요할 때 씁니다. 정확한 수치를 입력해야 하면 [텍스트 입력 필드](./input)를, 단계가 몇 개뿐이면 [라디오 버튼](./radio)을 씁니다.
- 단계는 전체 범위의 10~20%로 정합니다. 너무 세밀하면 고르기 어렵습니다.
- 말풍선은 항상 핸들 위 가운데에 표시되어, 값 글자가 길면 양 끝에서 슬라이더 밖으로 조금 나갈 수 있습니다. 화면 끝에 붙여 쓸 때는 양옆에 여백을 둡니다.
- 레이블은 생략하지 않습니다. 화면에서 숨겨야 하면 `hide-label`을 지정합니다(화면낭독기는 읽음).

## 접근성

- 기본 `<input type="range">`라 핸들을 끌거나 트랙을 눌러 값을 바꾸고, 키보드로는 <kbd>←</kbd>/<kbd>→</kbd>(또는 <kbd>↓</kbd>/<kbd>↑</kbd>)로 한 단계씩, <kbd>Home</kbd>/<kbd>End</kbd>로 최솟값/최댓값을 고릅니다.
- `value-text`를 주면 화면낭독기가 숫자 대신 바꾼 글자(예: `조금 크게`, `50%`)를 읽습니다.
- 키보드 초점은 핸들 둘레에 표시됩니다.

## API

## KrdsRangeSlider

<ComponentApi name="KrdsRangeSlider" />
