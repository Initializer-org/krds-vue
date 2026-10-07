<script setup>
import Basic from './demos/side-navigation/Basic.vue'
import TwoDepthLink from './demos/side-navigation/TwoDepthLink.vue'
import Multiple from './demos/side-navigation/Multiple.vue'
</script>

# 사이드 메뉴 Side navigation

사이드 메뉴는 서브 화면 내에서의 이동을 위해 사용하는 메뉴이다. 일반적으로 본문 영역의 좌측에 사이드바 형태로 제공된다. 메인 메뉴보다 훨씬 좁고 깊은 페이지 구조 탐색에 사용되기 때문에 링크의 개수가 많고 복잡하게 표현되기 쉽다.

## 기본

`v-model`로 메뉴 아이템 배열을 전달합니다. 2Depth의 `subItems`는 펼침 목록으로, 3Depth의 `subItems`는 4Depth 팝업으로 렌더링되며 `expanded`로 초기 펼침 상태를 지정합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/side-navigation/Basic.vue

## 2Depth 링크

`subItems`가 없는 2Depth 항목은 링크로 렌더링되고, `onClick`으로 클릭 동작을 지정할 수 있습니다.

<div class="demo vp-raw"><TwoDepthLink /></div>

<<< ./demos/side-navigation/TwoDepthLink.vue

## 여러 개 배치

한 페이지에 여러 개를 두어도 내부 id는 겹치지 않습니다. `aria-label`로 각 메뉴를 구분합니다.

<div class="demo vp-raw"><Multiple /></div>

<<< ./demos/side-navigation/Multiple.vue

## API

### KrdsSideNavigation

<ComponentApi name="KrdsSideNavigation" />
