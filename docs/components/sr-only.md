<script setup>
import Basic from './demos/sr-only/Basic.vue'
</script>

# 숨긴 콘텐츠 v-sr-only

v-sr-only 디렉티브는 스크린 리더 전용 텍스트를 위한 최소 구현 디렉티브이다.

## 기본

`v-sr-only`를 단 요소에 KRDS `.sr-only` 클래스가 붙어 화면에서는 보이지 않고 스크린 리더로만 읽힙니다. 아래 예제의 가운데 문장은 화면에 표시되지 않습니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/sr-only/Basic.vue

## 사용법

플러그인을 등록(`app.use(KrdsVue)`)하면 `v-sr-only`가 전역 디렉티브로 등록됩니다. 패키지에서 `vSrOnly`를 따로 export하지 않으므로, 플러그인 없이 컴포넌트만 개별 import해 쓸 때는 요소에 `class="sr-only"`를 직접 지정합니다.

| 사용                | 동작                                   |
| ------------------- | -------------------------------------- |
| `v-sr-only`         | 요소에 `.sr-only` 클래스를 추가합니다. |
| `v-sr-only="true"`  | `v-sr-only`와 같습니다.                |
| `v-sr-only="false"` | 클래스를 추가하지 않습니다.            |

바인딩 값이 바뀌면 그에 맞춰 클래스를 추가하거나 제거하고, 요소가 언마운트되면 클래스를 제거합니다.
