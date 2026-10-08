<script setup>
import Basic from './demos/input/Basic.vue'
import States from './demos/input/States.vue'
import Sizes from './demos/input/Sizes.vue'
import Loading from './demos/input/Loading.vue'
import IconButtons from './demos/input/IconButtons.vue'
</script>

# 텍스트 입력 필드 Text input

텍스트 입력 필드는 사용자가 키보드로 글자, 숫자, 기호 등이 조합된 한 줄의 짧은 텍스트를 입력하는 경우에 사용하는 요소이다.

<DocTabs>
<template #overview>

## 기본

`KrdsFormGroup`·`KrdsFormLabel`·`KrdsFormHint`와 함께 써서 레이블과 도움말을 붙입니다. `readonly`·`disabled`로 읽기 전용과 비활성화 상태를 만듭니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/input/Basic.vue

## 상태

`state`를 `error`·`success`·`information`으로 지정하고 아래 `KrdsFormHint`의 `type`도 같은 값으로 맞춥니다. `error`일 때는 입력 필드 테두리도 에러 색으로 바뀝니다.

<div class="demo vp-raw"><States /></div>

<<< ./demos/input/States.vue

## 사이즈

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/input/Sizes.vue

## 로딩

`loading`을 지정하면 입력 필드 안에 스피너가 표시됩니다. 이때 기본 슬롯(아이콘 버튼)은 렌더링되지 않습니다.

<div class="demo vp-raw"><Loading /></div>

<<< ./demos/input/Loading.vue

## 아이콘 버튼

`icon`을 지정하고 기본 슬롯에 버튼을 넣으면 입력 필드 안쪽에 버튼이 배치됩니다. 보이는 텍스트가 없으므로 `sr-only` 텍스트로 버튼 이름을 제공합니다. 비밀번호 보기 전환이나 내용 삭제 같은 버튼 동작은 컴포넌트가 처리하지 않으므로 직접 구현합니다. 버튼이 여러 개면 `KrdsButtonGroup`으로 묶습니다 (KRDS `.btn-group`, 입력 필드 안 전용).

<div class="demo vp-raw"><IconButtons /></div>

<<< ./demos/input/IconButtons.vue

</template>
<template #api>

### KrdsInput

<ComponentApi name="KrdsInput" />

### KrdsButtonGroup

<ComponentApi name="KrdsButtonGroup" />

</template>
</DocTabs>
