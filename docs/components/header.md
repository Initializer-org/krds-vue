# 헤더 Header

헤더는 웹사이트의 상단 헤더 영역을 구성하는 컴포넌트이다.
유틸리티 메뉴, 브랜딩 영역, 네비게이션 메뉴를 슬롯을 통해 유연하게 구성할 수 있다.
네비게이션 슬롯에는 KrdsMainMenu 등 완성된 메뉴 컴포넌트를 그대로 전달한다.

<DocTabs>
<template #overview>

## 기본

`utility`, `branding` 슬롯에는 KRDS 헤더 마크업을, `navigation` 슬롯에는 `KrdsMainMenu`를, `mobileNavigation` 슬롯에는 `KrdsMainMenu`(`variant="mobile"`)를 전달합니다.

헤더는 화면 상단에 고정(sticky)되고 메인 메뉴를 열면 화면 전체에 배경 딤이 깔리므로 예제를 별도 화면(iframe)에 띄웁니다. 예제는 1024px 폭 화면을 축소해 PC 레이아웃으로 보여 줍니다.

<DemoFrame src="/frame/header/basic" title="헤더 기본 예제" :height="480" :width="1024" />

<<< ./demos/header/Basic.vue

## 모바일

1024px 미만 화면에서는 유틸리티 메뉴와 PC 메인 메뉴가 숨겨지고 전체메뉴 버튼이 표시됩니다. 전체메뉴 버튼의 `aria-controls`를 모바일 드로어 id(`KrdsMainMenu`의 `mobileId`, 기본값 `mobile-nav`)에 연결하고 `v-model:open`으로 드로어를 엽니다. 아래는 같은 예제를 문서 폭(1024px 미만) 그대로 띄운 것으로, 전체메뉴 버튼으로 드로어를 확인할 수 있습니다.

<DemoFrame src="/frame/header/basic" title="헤더 모바일 예제" :height="640" />

</template>
<template #api>

## KrdsHeader

<ComponentApi name="KrdsHeader" />

## KrdsMainMenu

<ComponentApi name="KrdsMainMenu" />

</template>
</DocTabs>
