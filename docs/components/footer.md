# 푸터 Footer

푸터는 화면을 구성하는 가장 마지막 요소로 헤더와 본문에서 원하는 정보를 찾지 못하였거나 사이트 구조 탐색 중에 길을 잃은 사용자들이 대면하게 되는 정보이다. 따라서 푸터에는 사용자가 서비스를 탐색할 수 있는 추가적인 수단, 문제를 해결하는 데 참고할 수 있는 유용한 링크가 제공되어야 한다.

## 기본

`top`, `logo`, `content`, `bottom` 슬롯에 KRDS 푸터 마크업을 그대로 전달합니다. 하단에는 운영기관 식별자(`KrdsIdentifier`)를 함께 둡니다.

푸터 레이아웃은 화면 폭 기준으로 바뀌므로 예제를 별도 화면(iframe)에 띄웁니다. 미리보기 폭에서는 768px 미만(모바일) 레이아웃으로 표시되니, 1024px 이상의 PC 레이아웃은 새 창에서 확인하세요.

<DemoFrame src="/frame/footer/basic" title="푸터 기본 예제" :height="780" />

<<< ./demos/footer/Basic.vue

## API

### KrdsFooter

<ComponentApi name="KrdsFooter" />

### KrdsIdentifier

<ComponentApi name="KrdsIdentifier" />
