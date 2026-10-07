<script setup>
import Basic from './demos/critical-alerts/Basic.vue'
import Types from './demos/critical-alerts/Types.vue'
</script>

# 긴급 공지 Critical alerts

긴급 공지는 본문 상단에 강조되어 표시되는 배너로 사용자에게 긴급하거나 중요한 정보를 전달하는 데 사용된다. 모든 공공 디지털 서비스에서 동일한 긴급 공지 컴포넌트를 사용함으로써 사용자는 긴급한 정보를 일관되고 예측 가능한 방식으로 찾고 이해할 수 있다.

## 기본

`link-href`를 지정하면 링크가 표시됩니다. 링크 텍스트(`link-text`)는 768px 미만 화면에서 숨겨지고 화살표 아이콘만 남습니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/critical-alerts/Basic.vue

## 타입

`type`에 따라 배지 문구가 `danger`는 긴급, `ok`는 안전, `info`는 안내로 표시됩니다.

<div class="demo vp-raw"><Types /></div>

<<< ./demos/critical-alerts/Types.vue

## API

### KrdsCriticalAlerts

<ComponentApi name="KrdsCriticalAlerts" />
