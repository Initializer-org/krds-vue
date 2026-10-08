# 콘텐츠 내 탐색 In-page navigation

콘텐츠 내 탐색은 사용자가 본문의 구조를 훑어보고 원하는 콘텐츠로 빠르게 이동할 수 있도록 하는 탐색 수단이다. 화면을 스크롤 할 때 특정 위치에 고정되어 콘텐츠의 목차 역할을 하는 동시에 사용자가 페이지 내 탐색에서 특정 항목을 클릭하면 연결된 섹션으로 스크롤 된다.

## 기본

화면에 고정되고 창 스크롤에 맞춰 현재 섹션을 표시하므로 예제를 별도 화면(iframe)에 띄웁니다. 768px 이상 화면에서는 본문 오른쪽에 고정되고 그보다 좁으면 본문 위에 표시됩니다. 이 예제는 800px 폭 화면을 축소해 보여 줍니다. KRDS 레이아웃(`#container.krds-in-page-navigation-type > .inner.in-between > .contents`) 안에 배치해야 합니다.

<DemoFrame src="/frame/in-page-navigation/basic" title="콘텐츠 내 탐색 기본 예제" :height="620" :width="800" />

<<< ./demos/in-page-navigation/Basic.vue

## API

## KrdsInPageNavigation

<ComponentApi name="KrdsInPageNavigation" />
