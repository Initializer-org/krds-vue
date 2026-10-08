<script setup>
import Basic from './demos/spinner/Basic.vue'
import WithLabel from './demos/spinner/WithLabel.vue'
import InputLoading from './demos/spinner/InputLoading.vue'
</script>

# 스피너 Spinner

스피너는 화면이나 요소의 다양한 처리 상태를 시각적으로 표시한 것으로 화면 전체나 일부 요소에 접근하기 위해 일정 시간 동안 대기해야 함을 사용자에게 안내한다.

## 기본

스피너는 부모 요소의 너비와 높이를 채우고 가운데에 표시됩니다. `role="status"`와 화면 낭독기용 "로딩 중" 텍스트가 함께 렌더링됩니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/spinner/Basic.vue

## 라벨 포함

`label`로 스피너 옆에 안내 텍스트를 표시합니다.

<div class="demo vp-raw"><WithLabel /></div>

<<< ./demos/spinner/WithLabel.vue

## 입력 필드 로딩

입력 필드와 스피너를 `.form-spinner`로 감싸면 스피너가 입력 필드 오른쪽 안에 표시됩니다. `KrdsInput`의 `loading`을 지정해도 같은 구조로 렌더링됩니다.

<div class="demo vp-raw"><InputLoading /></div>

<<< ./demos/spinner/InputLoading.vue

## API

## KrdsSpinner

<ComponentApi name="KrdsSpinner" />
