<script setup>
import Basic from './demos/select/Basic.vue'
import Sizes from './demos/select/Sizes.vue'
import Sort from './demos/select/Sort.vue'
import Error from './demos/select/Error.vue'
</script>

# 셀렉트 Select

셀렉트는 사용자에게 여러 개의 옵션 목록을 팝업으로 제공하여 그 중 한 개의 값을 선택할 수 있도록 하는 경우에 사용한다.

## 기본

`KrdsFormGroup`·`KrdsFormLabel`·`KrdsFormHint`와 함께 써서 레이블과 도움말을 연결합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/select/Basic.vue

## 사이즈

<div class="demo vp-raw"><Sizes /></div>

<<< ./demos/select/Sizes.vue

## 정렬 스타일

목록의 정렬 기준처럼 보이는 레이블 없이 쓰는 셀렉트입니다. `title`로 이름을 제공합니다.

<div class="demo vp-raw"><Sort /></div>

<<< ./demos/select/Sort.vue

## 에러 상태

<div class="demo vp-raw"><Error /></div>

<<< ./demos/select/Error.vue

## API

### KrdsSelect

<ComponentApi name="KrdsSelect" />
