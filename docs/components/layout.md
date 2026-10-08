# 레이아웃 Layout

웹사이트의 전체 레이아웃 구조를 제공하는 컴포넌트이다. 스크롤 방향에 따라 자동으로 scroll-up/scroll-down 클래스를 추가한다.

<DocTabs>
<template #overview>

## 기본

`#wrap` 요소를 만들고 창 스크롤 방향에 따라 `scroll-up`/`scroll-down` 클래스를 붙여 헤더를 숨기거나 다시 보여 줍니다. 창 스크롤에 의존하므로 예제를 별도 화면(iframe)에 띄웁니다. 스크롤 위치를 `#container` 요소 기준으로 판단하므로 본문은 `id="container"` 요소에 넣습니다. 예제는 1024px 폭 화면을 축소해 PC 레이아웃으로 보여 줍니다. 1024px 미만 화면에서는 헤더 유틸리티 메뉴, 주 메뉴, 사이드 메뉴가 숨겨지고 전체메뉴 버튼이 표시됩니다.

<DemoFrame src="/frame/layout/basic" title="레이아웃 기본 예제" :height="560" :width="1024" />

<<< ./demos/layout/Basic.vue

## 스크롤 감지 비활성화

`enableScrollDetection`을 `false`로 지정하면 스크롤 클래스를 붙이지 않습니다.

<DemoFrame src="/frame/layout/scroll-disabled" title="스크롤 감지를 끈 레이아웃 예제" :height="240" />

<<< ./demos/layout/ScrollDisabled.vue

</template>
<template #api>

### KrdsLayout

<ComponentApi name="KrdsLayout" />

</template>
</DocTabs>
