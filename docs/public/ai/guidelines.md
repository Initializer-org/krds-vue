# KRDS Vue 개발 지침

이 프로젝트는 대한민국 정부 디자인 시스템(KRDS)을 Vue 3로 구현한 `@krds.ui/vue`로 화면을 만든다. 코드를 작성할 때 아래 지침을 따른다.

- 문서: https://krds.initializer.org/
- 전체 문서(AI용): https://krds.initializer.org/llms-full.txt
- KRDS 원본: https://www.krds.go.kr/

## 설치와 설정

- 패키지: `@krds.ui/vue` (Vue 3.5 이상).
- 앱 진입점에서 스타일을 한 번만 가져온다: `import '@krds.ui/vue/style'`.
- 전역 등록: `app.use(KrdsVue)` (`import KrdsVue from '@krds.ui/vue'`). 일부만 등록하려면 `app.use(KrdsVue, { components: ['KrdsButton', 'KrdsInput'] })`.
- 전역 등록하지 않으면 필요한 컴포넌트를 직접 가져온다: `import { KrdsButton } from '@krds.ui/vue'`.
- 전역 등록한 컴포넌트의 템플릿 타입을 쓰려면 `tsconfig.json`의 `compilerOptions.types`에 `"@krds.ui/vue/global"`을 추가한다.
- Nuxt: `nuxt.config.ts`의 `css`에 `'@krds.ui/vue/style'`을 넣고, 플러그인에서 `nuxtApp.vueApp.use(KrdsVue)`로 등록한다. 전역 타입은 `.d.ts` 파일에 `/// <reference types="@krds.ui/vue/global" />`을 둔다. 서버 렌더링을 지원한다.
- 타입은 패키지에서 가져온다: `KrdsTabItem`, `MainMenuItem`, `SideNavItem`, `FileInfo`, `KrdsFloatingButtonItem`, `KrdsResizeScale` 등. 타입만 쓸 때는 `import type`을 쓴다.

## 기본 원칙

- KRDS에 있는 화면 요소(버튼, 입력, 모달, 탭, 메뉴 등)는 직접 HTML로 만들지 말고 `Krds*` 컴포넌트를 쓴다. 다른 UI 라이브러리와 섞지 않는다.
- 컴포넌트가 지원하지 않는 모양을 만들 때는 KRDS 원본 클래스(`krds-btn`, `svg-icon` 등)와 디자인 토큰(`--krds-*` CSS 변수)을 쓴다. 색·간격 값을 직접 적지 않는다.
- KRDS는 루트 글자 크기를 62.5%로 둔다(1rem = 10px). 직접 쓰는 CSS도 rem으로 적는다(예: 16px → 1.6rem).
- 컴포넌트 속성·이벤트·슬롯은 추측하지 말고 문서의 API 표(https://krds.initializer.org/components/ 의 각 문서 "API 레퍼런스")를 따른다.

## 페이지 레이아웃

공공 누리집 기본 구조는 아래 순서를 따른다.

```vue
<KrdsLayout>
  <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
  <KrdsMasthead>이 누리집은 대한민국 공식 전자정부 누리집입니다.</KrdsMasthead>
  <KrdsHeader>
    <template #utility><!-- 언어 변경(KrdsLanguageSwitcher)·화면 크기(KrdsResize) --></template>
    <template #branding><!-- h2.logo, .header-actions --></template>
    <template #navigation><KrdsMainMenu :items="menu" /></template>
    <template #mobileNavigation><KrdsMainMenu v-model:open="mobileOpen" variant="mobile" :items="menu" /></template>
  </KrdsHeader>
  <main id="container">
    <div class="inner in-between">
      <KrdsSideNavigation v-model="sideMenu" title="메뉴 제목" />
      <div class="contents">
        <KrdsBreadcrumb :items="[{ text: '홈', href: '/' }, { text: '현재 페이지' }]" />
        <!-- 본문 -->
      </div>
    </div>
  </main>
  <KrdsFooter>
    <template #logo>...</template>
    <template #content>...</template>
    <template #bottom>
      ...
      <KrdsIdentifier>이 누리집은 OO 누리집입니다.</KrdsIdentifier>
    </template>
  </KrdsFooter>
</KrdsLayout>
```

- 건너뛰기 링크(`KrdsSkipLink`)는 페이지 맨 앞에 두고 본문(`#container`)을 가리킨다.
- 메인 메뉴는 PC(`KrdsMainMenu`)와 모바일(`variant="mobile"`)에 같은 `items`를 쓴다. 헤더의 "전체메뉴" 버튼에는 `aria-controls="mobile-nav"`와 `aria-expanded`를 단다.
- 사이드 메뉴가 없는 페이지는 `<main id="container"><div class="inner">…</div></main>`로 둔다.

## 폼

```vue
<KrdsFormGroup>
  <KrdsFormLabel for="apply-name">이름 (필수)</KrdsFormLabel>
  <KrdsInput id="apply-name" v-model="name" :state="error ? 'error' : 'default'" />
  <KrdsFormHint v-if="error" type="error">{{ error }}</KrdsFormHint>
</KrdsFormGroup>
```

- 입력 요소는 `KrdsFormGroup` 안에 `KrdsFormLabel`(`for`)과 같은 `id`를 가진 입력으로 둔다. 레이블 없는 입력을 만들지 않는다.
- 도움말은 `KrdsFormHint`, 오류는 입력의 `state="error"`와 `KrdsFormHint type="error"`를 함께 쓴다.
- 값은 `v-model`로 다룬다: `KrdsInput`·`KrdsTextarea`(문자열), `KrdsSelect`(`:options="[{ value, label }]"`), `KrdsCheckbox`·`KrdsToggleSwitch`(불리언), `KrdsRadio`(같은 `v-model`과 `name`, 항목마다 `value`), `KrdsDateInput`(문자열 날짜), `KrdsFileUpload`(`FileInfo[]`).
- 라디오·체크박스 묶음은 `fieldset`과 `legend`로 감싸고 `KrdsCheckArea` 안에 둔다.
- 입력 필드 안의 여러 버튼(내용 삭제, 비밀번호 보기)만 `KrdsButtonGroup`으로 묶는다. 일반 버튼 나열에는 쓰지 않는다.

## 자주 쓰는 컴포넌트

- 버튼 `KrdsButton`: `variant`(`primary`·`secondary`·`tertiary`), `size`(`xsmall`~`xlarge`). 한 화면의 주요 행동에만 `primary`를 쓴다. 아이콘만 있는 버튼(`icon`)에는 화면낭독기용 이름(`<span class="sr-only">이름</span>`)을 넣는다.
- 링크 `KrdsLink`: 새 창으로 여는 링크는 `target="_blank"`와 `title="새 창 열림"`을 단다.
- 모달 `KrdsModal`: `v-model`(불리언), `modal-id`, 슬롯 `#title`·기본·`#footer`.
- 탭 `KrdsTabs`: `:tabs="[{ id, label }]"`, `v-model`(탭 id), 탭 id와 같은 이름의 슬롯에 내용을 넣는다.
- 표 `KrdsTable`: `:columns="[{ name, label, field }]"`, `:rows`, `class="col data"`, 표 구성을 설명하는 `caption`. 체크박스·버튼·배지는 `#cell-<name>="{ row, value }"` 슬롯으로, 숨긴 열 제목은 `#header-<name>`으로 넣는다.
- 페이지네이션 `KrdsPagination`: `v-model`(페이지 번호), `:max`(마지막 페이지).
- 단계 표시기 `KrdsStepIndicator`: `:model-value`(0부터 시작하는 현재 단계) 안에 `KrdsStep`(`step`, `title`)을 둔다. 표시 전용이며 단계 이동은 이전·다음 버튼에서 값을 바꾼다.
- 아코디언 `KrdsAccordionGroup` + `KrdsAccordionItem`: 항목마다 `id`·`title`·`content`, 열린 항목은 `:open-item`과 `@toggle`로 관리한다.
- 화면 크기 조정 `KrdsResize`: `v-model`(`sm`·`md`·`lg`·`xlg`·`xxlg`), 헤더 유틸리티에 둔다.
- 플로팅 버튼 `KrdsFloatingButton`: 단일형(`label`·`icon`·`@click`) 또는 확장형(`:items`, 3개 이하). 화면 오른쪽 아래에 하나만 둔다.
- 토스트 `KrdsToast`: App.vue에 `<KrdsToast />`를 한 번 두고 `useToast().show('저장되었습니다.')` 또는 `useToast().warning('실패했습니다.')`로 띄운다(정보형 3초, 경고형 4초). 저장 완료 같은 한 줄 결과 알림에 쓰고 자동으로 사라진다.
- 스낵바 `KrdsSnackbar`: App.vue에 `<KrdsSnackbar />`를 한 번 두고 `useSnackbar().show({ title, message, action, onAction })`로 띄운다. 되돌리기·다시 시도 같은 추가 행동 1개가 필요한 알림에 쓰고 한 페이지에 하나만 둔다. 입력 항목 오류는 토스트·스낵바 대신 `KrdsFormHint`로 알린다.
- 수량 토글 `KrdsQuantityToggle`: `v-model`(숫자), `label`(필수, `KrdsFormLabel` 없이 자체 레이블), `:min`·`:max`. 범위는 기준값 포함 11단계 이내로 두고, 그보다 넓으면 `KrdsInput`을 쓴다. 세로형은 `vertical`.
- 아이콘: `<KrdsIcon name="ico-..." />` 또는 `<i class="svg-icon ico-..."></i>`. 꾸밈용 아이콘은 화면낭독기가 읽지 않게 하고, 뜻이 있으면 옆에 글자나 숨김 텍스트를 둔다.

## 접근성

- 화면에 보이지 않지만 읽혀야 하는 글자는 `sr-only` 클래스나 `v-sr-only` 디렉티브를 쓴다.
- 제목은 h1부터 순서대로 쓰고 단계를 건너뛰지 않는다. 페이지마다 h1은 하나다.
- 누를 수 있는 요소 안에 다른 누를 수 있는 요소를 넣지 않는다(링크 안의 버튼 등).
- 초점 표시(outline)를 지우지 않는다. 직접 만든 요소도 키보드로 조작할 수 있게 한다.
- 색만으로 상태를 알리지 않는다. 오류는 글자(`KrdsFormHint`)로도 알린다.

## 디자인 토큰

컴포넌트로 만들 수 없는 부분에만 CSS를 직접 쓰고, 값은 아래 토큰으로 적는다. 여기 없는 토큰 이름을 지어내지 않는다(전체 목록: https://github.com/Initializer-org/krds-vue/blob/main/src/tokens/krds_tokens.css).

- 색은 역할 토큰 `--krds-light-color-{역할}-{변형}`을 쓴다. 단계 색(`--krds-color-light-primary-50` 등)은 직접 쓰지 않는다.
  - 글자 `text`: `basic`(본문), `bolder`(제목), `subtle`(보조), `disabled`, `primary`, `point`, 상태(`danger`·`warning`·`success`·`information`), 어두운 면 위의 `basic-inverse`
  - 페이지 배경 `background`: `white`, `gray-subtler`, `gray-subtle`, `inverse`, `dim`(모달 뒤 가림막)
  - 상자·카드 면 `surface`: `white`, `gray-subtler`, `gray-subtle`, `disabled`, `{primary|secondary|point|danger|warning|success|information}-subtler`
  - 테두리 `border`: `gray-light`, `gray`, `gray-dark`, `gray-darker`, `disabled`, `primary`·`secondary`·`point`·상태(각각 `-light` 변형 있음)
  - 구분선 `divider`: `gray-light`, `gray`, `gray-dark`, `gray-darker`, `primary`, `primary-light`
  - 아이콘 `icon`: `gray`, `gray-light`, `disabled`, `inverse`, `primary`, `secondary`, `point`, 상태
  - 링크 `link`: `default`, `hover`, `pressed`, `visited`
- 간격: 요소 사이 `--krds-gap-1`~`12`(0.2rem~8rem), 안쪽 여백 `--krds-padding-1`~`10`(0.2rem~4rem). 페이지 단락 사이는 `--krds-pc-gap-layout-*`·`--krds-mobile-gap-layout-*`(예: `h2-h3`, `title-body-medium`, `contents-footer`).
- 모서리: `--krds-radius-xsmall1`·`small1`·`medium1`·`large1`·`xlarge1`(0.2rem~1.2rem), 알약 모양은 `--krds-radius-max`.
- 글자 크기: `--krds-pc-font-size-{종류}-{크기}`, 화면 너비 768px 미만에서는 같은 이름의 `--krds-mobile-font-size-*`. 종류는 `display`(`large`·`medium`·`small`), `heading`(`xlarge`~`xxsmall`), `body`·`label`(`large`~`xsmall`).
- 글자 굵기 `--krds-font-weight-regular`·`bold`, 줄 간격 `--krds-line-height-base`. `--krds-typo-font-weight-*`는 CSS 값이 아니므로 쓰지 않는다.

## 화면 모드

- `<html data-krds-mode="light">`(기본), `"high-contrast"`(선명하게, 어두운 배경), `"theme"`(시스템 설정을 따름)을 지원한다.
- 색 토큰은 모드에 따라 저절로 바뀌지 않는다. 직접 쓰는 색은 같은 역할의 `--krds-high-contrast-color-*`로 다시 지정하고, 고대비 모드에서도 확인한다.

```css
.notice-box {
  color: var(--krds-light-color-text-basic);
  background-color: var(--krds-light-color-surface-gray-subtler);
}
[data-krds-mode='high-contrast'] .notice-box {
  color: var(--krds-high-contrast-color-text-basic);
  background-color: var(--krds-high-contrast-color-surface-gray-subtler);
}
@media (prefers-color-scheme: dark) {
  [data-krds-mode='theme'] .notice-box {
    color: var(--krds-high-contrast-color-text-basic);
    background-color: var(--krds-high-contrast-color-surface-gray-subtler);
  }
}
```

## 하지 말 것

- `@krds.ui/vue/dist/...` 내부 파일 경로를 가져오지 않는다(스타일은 `@krds.ui/vue/style`).
- 컴포넌트가 만든 마크업의 클래스 구조를 CSS로 크게 바꾸지 않는다. 필요한 모양은 속성과 슬롯으로 만든다.
- 문서에 없는 속성이나 이벤트 이름을 지어내지 않는다.
