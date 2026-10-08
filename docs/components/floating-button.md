# 플로팅 버튼 Floating action button

플로팅 버튼은 사용자가 화면에서 가장 자주 사용하고 중요한 작업에 단일 또는 다중으로 사용한다. 페이지가 스크롤될 때에도 화면 우측 하단에 계속 표현한다.

<DocTabs>
<template #overview>

## 단일형

아이콘과 레이블로 하나의 주요 작업을 보여 줍니다. `href`를 주면 링크, 없으면 버튼으로 렌더링하고 `click` 이벤트를 보냅니다. `hide-label`을 주면 아이콘만 보이고 레이블은 화면낭독기용으로 남습니다. 화면 오른쪽 아래에 고정되므로 예제를 별도 화면(iframe)에 띄웁니다.

<DemoFrame src="/frame/floating-button/single" title="플로팅 버튼 단일형 예제" :height="320" />

<<< ./demos/floating-button/Single.vue

## 확장형

`items`를 주면 확장형이 됩니다. + 버튼을 누르면 가림막과 함께 항목이 펼쳐지고, X 버튼·가림막·Esc 키로 닫습니다. 항목을 누르면 목록을 닫고 초점을 + 버튼으로 돌려준 뒤 `select` 이벤트(항목, 순서, 클릭 이벤트)를 보냅니다. 링크 항목은 `event.preventDefault()`로 라우터 이동에 쓸 수 있고, `external`을 주면 새 창으로 엽니다.

<DemoFrame src="/frame/floating-button/expand" title="플로팅 버튼 확장형 예제" :height="480" />

<<< ./demos/floating-button/Expand.vue

## 사용 지침

- 화면 오른쪽 아래에 배치하고, 화면의 모든 요소 위에 둡니다.
- 플로팅 버튼이 2개 이상 필요하면 확장형을 쓰고, 항목은 3개 이하로 구성합니다.
- 확장형의 깊이는 2수준 이하로만 사용합니다.
- 자주 쓰는 행동이 여러 개이거나 지도·캘린더처럼 제스처 조작이 많은 화면에는 쓰지 않습니다.

</template>
<template #api>

## KrdsFloatingButton

<ComponentApi name="KrdsFloatingButton" />

</template>
</DocTabs>
