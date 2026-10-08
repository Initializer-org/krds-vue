<script setup>
import Basic from './demos/contextual-help/Basic.vue'
import Positions from './demos/contextual-help/Positions.vue'
import HelpIcon from './demos/contextual-help/HelpIcon.vue'
</script>

# 맥락적 도움말 Contextual help

컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에 표시된다.

## 기본

아이콘 버튼을 누르면 도움말이 열리고 그 안의 첫 번째 링크나 버튼으로 포커스가 이동합니다. 닫기 버튼, Esc 키, 바깥 클릭으로 닫습니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/contextual-help/Basic.vue

## 위치

`position`으로 도움말이 열리는 위치를 지정합니다. 기본값은 `top left`입니다.

<div class="demo vp-raw"><Positions /></div>

<<< ./demos/contextual-help/Positions.vue

## 도움말 아이콘

`help-icon`을 지정하면 정보 아이콘 대신 도움(물음표) 아이콘을 표시합니다.

<div class="demo vp-raw"><HelpIcon /></div>

<<< ./demos/contextual-help/HelpIcon.vue

## API

## KrdsContextualHelp

<ComponentApi name="KrdsContextualHelp" />
