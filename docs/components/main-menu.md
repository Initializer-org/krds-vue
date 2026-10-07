<script setup>
import PcMegaMenu from './demos/main-menu/PcMegaMenu.vue'
import SingleList from './demos/main-menu/SingleList.vue'
</script>

# 메인 메뉴 Main menu

메인 메뉴는 서비스 전체의 구조를 보여주고 주요 화면으로 이동할 수 있게 하는 메뉴이다. 일반적으로 헤더 영역에 위치하며, 데스크탑에서는 메가 메뉴 형태로, 모바일에서는 드로어 형태로 제공된다.

`variant` 속성으로 두 형태를 전환합니다. PC 메가 메뉴는 원본 KRDS처럼 패널을 열면 페이지 전체에 배경 딤(`backdrop`)을 깝니다. 메뉴가 딤 위에 보이려면 헤더(`#krds-header`, `KrdsHeader`) 안에 두어야 하며, 헤더 밖에서 쓰면 `:backdrop="false"`로 끕니다.

## PC 메가 메뉴

PC 메가 메뉴는 1024px 이상 화면에서만 표시됩니다. 미리보기는 헤더 밖에 두므로 `:backdrop="false"`로 배경 딤을 끄고, PC 레이아웃 그대로 보이도록 1024px 폭으로 표시합니다(가로 스크롤). 헤더 안에서 쓰는 예는 [헤더](./header)를 참고하세요.

<div class="demo vp-raw" style="overflow-x: auto"><div style="min-width: 1024px; height: 480px"><PcMegaMenu /></div></div>

<<< ./demos/main-menu/PcMegaMenu.vue

## PC 2depth 없는 메뉴

2depth 목록 없이 마지막 뎁스 링크만 나열하는 경우 `single-list` 레이아웃으로 렌더링됩니다. `items`만 지정하면 됩니다.

<div class="demo vp-raw" style="overflow-x: auto"><div style="min-width: 1024px; height: 300px"><SingleList /></div></div>

<<< ./demos/main-menu/SingleList.vue

## 모바일 드로어 메뉴

모바일 드로어는 `v-model:open`으로 제어합니다. 외부 트리거 버튼에 `aria-controls`로 `mobileId`를 연결하고 `aria-expanded`를 함께 관리합니다. 2depth의 `items`는 3depth로, 3depth의 `items`는 전체 화면 4depth 패널로 렌더링됩니다.

드로어는 화면 전체를 덮는 고정 위치 요소이고 1024px 이상 화면에서는 표시되지 않으므로, 예제를 별도 화면(iframe)에 띄웁니다.

<DemoFrame src="/frame/main-menu/mobile" title="메인 메뉴 모바일 드로어 예제" :height="640" />

<<< ./demos/main-menu/Mobile.vue

## API

### KrdsMainMenu

<ComponentApi name="KrdsMainMenu" />
