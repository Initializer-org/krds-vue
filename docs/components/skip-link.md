# 건너뛰기 링크 Skip link

건너뛰기 링크는 웹사이트에서 웹 페이지의 주요 콘텐츠 섹션의 탐색을 도와주는 페이지 내부 링크이다. 키보드나 가상 초점을 이용하여 콘텐츠를 탐색하는 사용자는 건너뛰기 링크를 이용하여 대부분의 페이지에서 반복되는 콘텐츠 영역을 건너뛰고 주요 콘텐츠로 빠르게 이동할 수 있다.

## 기본

페이지 최상단에 배치합니다. 링크는 포커스를 받기 전까지 화면에서 숨겨져 있다가, 포커스를 받으면 화면 맨 위에 고정되어 표시되므로 예제를 별도 화면(iframe)에 띄웁니다. 미리보기 안으로 Tab 키를 눌러 포커스를 옮겨 확인하세요.

<DemoFrame src="/frame/skip-link/basic" title="건너뛰기 링크 기본 예제" :height="340" />

<<< ./demos/skip-link/Basic.vue

## 여러 링크

`links`로 여러 링크를 하나의 래퍼(`#krds-skip-link`) 안에 렌더링합니다. 컴포넌트를 여러 개 나란히 두면 `id`가 중복되므로 `links`를 사용합니다.

<DemoFrame src="/frame/skip-link/multiple-links" title="건너뛰기 링크 여러 링크 예제" :height="240" />

<<< ./demos/skip-link/MultipleLinks.vue

## API

## KrdsSkipLink

<ComponentApi name="KrdsSkipLink" />
