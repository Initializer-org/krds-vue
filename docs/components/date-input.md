<script setup>
import Basic from './demos/date-input/Basic.vue'
import Disabled from './demos/date-input/Disabled.vue'
import Readonly from './demos/date-input/Readonly.vue'
import EventsAndHolidays from './demos/date-input/EventsAndHolidays.vue'
import Multiple from './demos/date-input/Multiple.vue'
</script>

# 날짜 입력 필드 Date input

날짜 입력 필드는 사용자가 특정 날짜 또는 기간을 입력하거나 선택하는 데 사용되는 요소이다.

## 기본

달력 버튼을 누르면 입력 필드 위쪽에 달력이 열리고 초점이 달력으로 이동합니다. 원본 KRDS와 같이 달력은 항상 위쪽으로 열리므로, 사용하는 화면에서 입력 필드 위에 달력 높이(약 540px)만큼 공간이 있어야 합니다. 이 문서의 예제 영역도 그만큼 위를 비워 두었습니다. 날짜를 고른 뒤 **확인**을 누르면 `YYYY.MM.DD` 형식으로 입력되고, 두 날짜를 차례로 고르면 `YYYY.MM.DD ~ YYYY.MM.DD` 기간으로 입력됩니다. <kbd>Esc</kbd>나 **취소**, 달력 바깥 클릭으로 닫히며 닫히면 초점이 달력 버튼으로 돌아옵니다.

<div class="demo vp-raw" style="padding-top: 560px"><Basic /></div>

<<< ./demos/date-input/Basic.vue

## 비활성화

입력과 달력 열기가 모두 막힙니다.

<div class="demo vp-raw"><Disabled /></div>

<<< ./demos/date-input/Disabled.vue

## 읽기 전용

직접 입력은 막히지만 달력 버튼은 그대로 사용할 수 있습니다.

<div class="demo vp-raw" style="padding-top: 560px"><Readonly /></div>

<<< ./demos/date-input/Readonly.vue

## 일정·휴일 표시

`initialYear`·`initialMonth`로 달력을 처음 열 때 보여 줄 달을 정합니다. `holidays`의 날짜는 일요일처럼 휴일로, `eventDates`의 날짜는 일정이 있는 날로 표시됩니다. 날짜는 `YYYY.MM.DD` 형식으로 지정합니다.

<div class="demo vp-raw" style="padding-top: 560px"><EventsAndHolidays /></div>

<<< ./demos/date-input/EventsAndHolidays.vue

## 여러 개 배치

달력을 열면 열려 있던 다른 달력은 닫힙니다.

<div class="demo vp-raw" style="padding-top: 560px"><Multiple /></div>

<<< ./demos/date-input/Multiple.vue

## API

### KrdsDateInput

<ComponentApi name="KrdsDateInput" />
