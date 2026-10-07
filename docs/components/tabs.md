<script setup>
import Basic from './demos/tabs/Basic.vue'
import Fill from './demos/tabs/Fill.vue'
import Full from './demos/tabs/Full.vue'
import Disabled from './demos/tabs/Disabled.vue'
import Controlled from './demos/tabs/Controlled.vue'
</script>

# 탭 Tab

탭은 버튼을 눌러 상호배타적인 여러 개의 콘텐츠 섹션을 전환할 수 있는 컴포넌트이다. 탭 버튼 목록과 콘텐츠 패널이 수직으로 쌓여 있는 형태로 표현되며, 사용자는 탭을 선택하여 해당 콘텐츠 섹션을 표시할 수 있다.

## 기본

`tabs`의 각 항목 `id`와 같은 이름의 슬롯에 패널 내용을 넣습니다. 처음에는 비활성화되지 않은 첫 번째 탭이 선택되고, 선택된 탭에는 스크린 리더용 "선택됨" 텍스트(`selectedText`)가 붙습니다. 좌우 방향키로 탭 버튼 사이에서 포커스를 옮길 수 있습니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/tabs/Basic.vue

## 버튼형

<div class="demo vp-raw"><Fill /></div>

<<< ./demos/tabs/Fill.vue

## 풀사이즈

<div class="demo vp-raw"><Full /></div>

<<< ./demos/tabs/Full.vue

## 비활성화

항목에 `disabled: true`를 주면 해당 탭을 선택할 수 없습니다.

<div class="demo vp-raw"><Disabled /></div>

<<< ./demos/tabs/Disabled.vue

## 외부 제어

`v-model`로 선택된 탭의 `id`를 제어합니다. 탭이 바뀌면 `change` 이벤트도 발생합니다.

<div class="demo vp-raw"><Controlled /></div>

<<< ./demos/tabs/Controlled.vue

## API

### KrdsTabs

<ComponentApi name="KrdsTabs" />
