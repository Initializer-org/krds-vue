<script setup>
import Basic from './demos/language-switcher/Basic.vue'
import External from './demos/language-switcher/External.vue'
</script>

# 언어 변경 Language switcher

언어 변경은 서비스의 콘텐츠를 표시할 언어를 변경하거나 별도의 외국어 서비스로 이동하는 데 사용되는 요소이다. 한국어가 익숙하지 않은 사용자가 콘텐츠 표시 언어를 변경할 수 있는 수단을 발견하지 못한다면 서비스를 이용할 수 없게 되므로, 디지털 정부서비스로 직관적이고 일관된 방식으로 언어 변경을 제공하는 것이 매우 중요하다.

## 기본

선택한 언어 코드가 `v-model`에 담깁니다. `prev-item` 슬롯으로 목록 위에 현재 언어를 표시할 수 있습니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/language-switcher/Basic.vue

## 외부 페이지 이동

`type="external"`이면 각 언어가 `url`로 새 창에서 이동하는 링크가 됩니다.

<div class="demo vp-raw"><External /></div>

<<< ./demos/language-switcher/External.vue

## API

### KrdsLanguageSwitcher

<ComponentApi name="KrdsLanguageSwitcher" />
