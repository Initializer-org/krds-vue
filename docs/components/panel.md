# 패널 Panel

패널은 본문 콘텐츠의 섹션이나 일부 요소에 대한 개념/용어 설명, 옵션의 구성, 이용 방법 등과 관련된 정보나 도움말, 따라하기 콘텐츠를 제공하는 사이드 패널이다.

## 기본

`v-model`로 펼침 상태를 제어합니다. 도움말 버튼과 패널이 화면 오른쪽에 고정(`position: fixed`)되므로 예제를 별도 화면(iframe)에 띄웁니다. 1024px 미만 화면에서는 패널이 화면 폭에서 3rem을 뺀 너비로 열리고 뒤 배경이 어두워지므로, PC 화면 표시는 새 창에서 확인하세요.

<DemoFrame src="/frame/panel/basic" title="패널 기본 예제" :height="600" />

<<< ./demos/panel/Basic.vue

## 도움 패널

기본 슬롯에 `KrdsTabs`를 넣어 도움 탭과 따라하기 탭을 구성합니다.

<DemoFrame src="/frame/panel/help" title="도움 패널 예제" :height="720" />

<<< ./demos/panel/Help.vue

## 따라하기 패널

`KrdsTabs`의 `v-model`을 `tutorial`로 지정해 따라하기 탭이 먼저 보이게 합니다.

<DemoFrame src="/frame/panel/tutorial" title="따라하기 패널 예제" :height="720" />

<<< ./demos/panel/Tutorial.vue

## API

### KrdsPanel

<ComponentApi name="KrdsPanel" />

### KrdsTabs

<ComponentApi name="KrdsTabs" />
