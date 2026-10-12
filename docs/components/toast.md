# 토스트 Toast

토스트는 사용자 행동에 대한 결과를 일시적으로 표시했다 사라지는 알림 메시지를 표시하는데 사용한다. 알림 메시지는 사용자가 인지할 수 있는 시간만큼 충분히 표시되어야 한다.

## 기본

`<KrdsToast />`를 App.vue에 한 번만 두고, 어느 컴포넌트에서든 `useToast().show(message, options)` 또는 단축형 `info(message)`·`warning(message)`로 띄웁니다. 노출 시간은 KRDS 가이드대로 정보형 3초, 주의·경고형(`type: 'warning'`) 4초이며 `duration`(ms)으로 바꿀 수 있습니다(0이면 닫지 않음). 떠 있는 동안 다시 `show()`하면 메시지를 바꾸고 노출 시간을 다시 세고, `hide()`로 바로 닫습니다. 화면낭독기가 읽도록 `role="status"` 영역은 항상 두고 표시할 때만 메시지를 넣습니다. 화면 하단에 고정되므로 예제를 별도 화면(iframe)에 띄웁니다.

<DemoFrame src="/frame/toast/basic" title="토스트 예제" :height="320" />

<<< ./demos/toast/Basic.vue

## 사용 지침

- 사용자 행동에 대한 즉각적인 피드백(저장 완료, 업로드 완료 등)을 한 줄로 알릴 때 씁니다.
- 중요하거나 긴급한 메시지는 긴급 공지나 모달을, 되돌리기 같은 추가 행동이 필요하면 [스낵바](/components/snackbar)를 씁니다.
- 개별 입력 항목의 오류·성공 메시지는 토스트 대신 입력 필드 옆의 `KrdsFormHint`로 알립니다.
- 하단 탭바나 플로팅 버튼과 겹치지 않게 앱 CSS에서 `.krds-toast { --krds-toast--bottom: 8rem }`처럼 위치를 조정합니다.
- 원본 KRDS에 구현이 없는 컴포넌트로, 가이드의 구조·위치·노출 시간과 디자인 토큰으로 만들었습니다.

## API

## KrdsToast

전역 토스트를 그리는 자리입니다. App에 한 번만 두며 props·events가 없습니다.

## useToast()

| 이름                          | 설명                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `show(message, options?)`     | 토스트 표시. `options.type`(`'info'` \| `'warning'`, 기본 `'info'`), `options.duration`(ms, 0이면 유지) |
| `info(message, duration?)`    | 정보형 토스트 (3초). 인증·저장·업로드 완료 등                                                           |
| `warning(message, duration?)` | 주의·경고형 토스트 (4초). 인증·저장·업로드 실패 등                                                      |
| `hide()`                      | 토스트 닫기                                                                                             |
