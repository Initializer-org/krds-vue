<script setup>
import Basic from './demos/tooltip/Basic.vue'
import Vertical from './demos/tooltip/Vertical.vue'
import Box from './demos/tooltip/Box.vue'
</script>

# 툴팁 Tooltip

툴팁은 요소나 본문 텍스트에 제공되는 짧은 부가 설명이다. 설명이 필요한 대상 또는 별도의 활성화 버튼에 마우스를 올리거나 초점을 이동했을 때 설명 텍스트가 표시된다.

## 기본

`type`으로 트리거 버튼 모양(`default`, `icon`, `button`)을 정합니다. 툴팁은 버튼 옆에 표시되고 Esc 키나 창 스크롤로 닫힙니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/tooltip/Basic.vue

## 세로 배치 (vertical)

`vertical`을 지정하면 툴팁이 버튼 위나 아래에 표시됩니다.

<div class="demo vp-raw"><Vertical /></div>

<<< ./demos/tooltip/Vertical.vue

## 박스형 (box)

`box`를 지정하면 여러 줄 설명에 맞는 박스형 툴팁이 버튼 위나 아래에 표시됩니다.

<div class="demo vp-raw"><Box /></div>

<<< ./demos/tooltip/Box.vue

## API

### KrdsTooltip

<ComponentApi name="KrdsTooltip" />
