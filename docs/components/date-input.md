<script setup>
import Basic from './demos/date-input/Basic.vue'
import Disabled from './demos/date-input/Disabled.vue'
import Readonly from './demos/date-input/Readonly.vue'
import EventsAndHolidays from './demos/date-input/EventsAndHolidays.vue'
import Multiple from './demos/date-input/Multiple.vue'
import TeleportDemo from './demos/date-input/Teleport.vue'
</script>

# 날짜 입력 필드 Date input

날짜 입력 필드는 사용자가 특정 날짜 또는 기간을 입력하거나 선택하는 데 사용되는 요소이다.

## 기본

달력 버튼을 누르면 달력이 열리고 초점이 달력으로 이동합니다. 원본 KRDS처럼 입력 필드 위쪽에 여는 것이 기본이고, 화면에서 위쪽 공간이 달력 높이보다 좁고 아래쪽이 더 넓으면 아래쪽에 엽니다. 날짜를 고른 뒤 **확인**을 누르면 `YYYY.MM.DD` 형식으로 입력되고, 두 날짜를 차례로 고르면 `YYYY.MM.DD ~ YYYY.MM.DD` 기간으로 입력됩니다. <kbd>Esc</kbd>나 **취소**, 달력 바깥 클릭으로 닫히며 닫히면 초점이 달력 버튼으로 돌아옵니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/date-input/Basic.vue

## 비활성화

입력과 달력 열기가 모두 막힙니다.

<div class="demo vp-raw"><Disabled /></div>

<<< ./demos/date-input/Disabled.vue

## 읽기 전용

직접 입력은 막히지만 달력 버튼은 그대로 사용할 수 있습니다.

<div class="demo vp-raw"><Readonly /></div>

<<< ./demos/date-input/Readonly.vue

## 일정·휴일 표시

`initialYear`·`initialMonth`로 달력을 처음 열 때 보여 줄 달을 정합니다. `holidays`의 날짜는 일요일처럼 휴일로, `eventDates`의 날짜는 일정이 있는 날로 표시됩니다. 날짜는 `YYYY.MM.DD` 형식으로 지정합니다.

<div class="demo vp-raw"><EventsAndHolidays /></div>

<<< ./demos/date-input/EventsAndHolidays.vue

## 여러 개 배치

달력을 열면 열려 있던 다른 달력은 닫힙니다.

<div class="demo vp-raw"><Multiple /></div>

<<< ./demos/date-input/Multiple.vue

## body에 렌더 (teleport)

달력은 원본 KRDS처럼 입력 필드 바로 뒤에 렌더되므로, `overflow`로 잘리는 컨테이너(스크롤 영역, 표 등) 안에서는 달력이 잘립니다. `teleport`를 지정하면 달력을 `body`에 렌더하고 입력 필드 자리에 맞춰 위치를 잡으며, 스크롤·화면 크기가 바뀌면 위치를 다시 계산합니다.

- 달력이 문서 끝에 렌더되므로 달력 안에서 <kbd>Tab</kbd>으로 빠져나가면 입력 필드 다음 요소가 아니라 문서 끝으로 이동합니다.
- 모달(`KrdsModal`) 안에서는 쓰지 마세요. 모달은 `aria-modal`이라 모달 밖으로 렌더된 달력에 스크린리더가 접근할 수 없고, 달력이 모달 아래에 깔립니다.

<div class="demo vp-raw"><TeleportDemo /></div>

<<< ./demos/date-input/Teleport.vue

## API

## KrdsDateInput

<ComponentApi name="KrdsDateInput" />
