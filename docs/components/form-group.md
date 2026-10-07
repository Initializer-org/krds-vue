<script setup>
import Basic from './demos/form-group/Basic.vue'
import HintTypes from './demos/form-group/HintTypes.vue'
</script>

# 폼 그룹 Form group

`KrdsFormGroup`은 입력 컴포넌트 하나와 그 레이블·도움말을 묶는 `.form-group` 영역입니다. `KrdsFormLabel`은 레이블(`.form-tit` 안의 `<label>`), `KrdsFormHint`는 입력 필드 아래의 도움말(`<p>`)을 만듭니다. 텍스트 입력 필드, 텍스트 영역, 셀렉트, 날짜 입력 필드 등과 함께 씁니다.

## 기본

`KrdsFormLabel`의 `for`에 입력 컴포넌트의 `id`를 지정해 레이블을 연결합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/form-group/Basic.vue

## 도움말 유형

`KrdsFormHint`의 `type`을 `error`·`success`·`information`으로 지정하면 각각 에러·성공·정보 메시지 스타일로 표시됩니다(기본값 `hint`). 입력 컴포넌트의 상태(`state`)와 같은 값으로 맞춥니다.

<div class="demo vp-raw"><HintTypes /></div>

<<< ./demos/form-group/HintTypes.vue

## API

### KrdsFormGroup

<ComponentApi name="KrdsFormGroup" />

### KrdsFormLabel

<ComponentApi name="KrdsFormLabel" />

### KrdsFormHint

<ComponentApi name="KrdsFormHint" />
