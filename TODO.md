# KRDS Vue 컴포넌트 개발 TODO 리스트

KRDS (Korea Digital Service) HTML을 Vue 3 + TypeScript 컴포넌트로 포팅하는 작업 목록입니다.

## 프로젝트 개요

- **원본**: [KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux)  
- **목표**: Vue 3 + TypeScript로 컴포넌트 포팅
- **배포**: NPM 패키지 `@krds.ui/vue`
- **현재 버전**: v0.0.12
- **KRDS 원본 동기화**: v1.1.0 반영 완료
- **현재 진행률**: 50/56 항목 완료 (미구현: MainMenu, Carousel, Alert, Grid, Card, Progress)

## 개발 TODO


### 1. 아이덴티티 컴포넌트 (Identity Components) - 4개
- [x] **KrdsIdentifier** - 운영기관 식별자
- [x] **KrdsMasthead** - 마스트헤드
- [x] **KrdsHeader** - 헤더
- [x] **KrdsFooter** - 푸터

### 2. 탐색 컴포넌트 (Navigation Components) - 7개
- [x] **KrdsSkipLink** - 건너뛰기 링크 (Skip link)
- [ ] **KrdsMainMenu** - 메인 메뉴 (Main menu)
- [x] **KrdsBreadcrumb** - 브레드크럼 (Breadcrumb)
- [x] **KrdsSideNavigation** - 사이드 메뉴 (Side navigation)
- [x] **KrdsInPageNavigation** - 콘텐츠 내 탐색 (In-page navigation)
- [x] **KrdsPagination** - 페이지네이션 (Pagination)
- [x] **KrdsTabBar** - 탭바 (Tab bars) - 컴포넌트가 아닌 개념 설명만 제공

### 3. 레이아웃 및 표현 (Layout & Presentation Components) - 13개
- [x] **KrdsStructuredList** - 구조화 목록 (Structured list)
- [x] **KrdsCriticalAlert** - 긴급 공지 (Critical alerts)
- [x] **KrdsCalendar** - 달력 (Calendar)
- [x] **KrdsDisclosure** - 디스클로저 (Disclosure)
- [x] **KrdsModal** - 모달 (Modal)
- [x] **KrdsBadge** - 배지 (Badge)
- [x] **KrdsAccordion** - 아코디언 (Accordion)
- [x] **KrdsImage** - 이미지 (Image) - 컴포넌트가 아닌 개념 설명만 제공
- [ ] **KrdsCarousel** - 캐러셀 (Carousel)
- [x] **KrdsTabs** - 탭 (Tab) - KrdsTab, KrdsTabList, KrdsTabPanels 포함
- [x] **KrdsTable** - 표 (Table)
- [x] **KrdsSplashScreen** - 스플래시 스크린 (Splash screen) - 컴포넌트가 아닌 개념 설명만 제공
- [x] **KrdsTextList** - 텍스트 목록 (Text list)

### 4. 액션 컴포넌트 (Action Components) - 2개
- [x] **KrdsLink** (link.html) - 링크
- [x] **KrdsButton** (btn-hierarchy.html) - 버튼

### 5. 선택 (Selection Components) - 5개
- [x] **KrdsRadio** - 라디오 버튼 (Radio button)
- [x] **KrdsCheckbox** - 체크박스 (Checkbox) - 체크 영역 포함
- [x] **KrdsSelect** - 셀렉트 (Select)
- [x] **KrdsTag** - 태그 (Tag) - KrdsTagGroup 포함
- [x] **KrdsToggleSwitch** - 토글 스위치 (Toggle switch)

### 6. 피드백 (Feedback Components) - 3개
- [x] **KrdsStepIndicator** - 단계 표시기 (Step indicator) - KrdsStep 포함
- [x] **KrdsSpinner** - 스피너 (Spinner)
- [x] **KrdsTts** - 음성 읽기 (Text-to-Speech) - Web Speech API 기반, 볼륨/재생 아이콘 지원

### 7. 도움 (Help Components) - 5개
- [x] **KrdsPanel** - 패널 (panel)
- [x] **KrdsContextualHelp** - 맥락적 도움말 (Contextual help)
- [x] **KrdsCoachMark** - 코치마크 (Coach mark)
- [x] **KrdsTooltip** - 툴팁 (Tooltip)

### 8. 입력 (Input Components) - 4개
- [x] **KrdsDateInput** - 날짜 입력 필드 (Date input)
- [x] **KrdsTextarea** - 텍스트 영역 (Textarea)
- [x] **KrdsInput** - 텍스트 입력 필드 (Text input) - loading 상태 포함
- [x] **KrdsFileUpload** - 파일 업로드 (File upload)

### 9. 설정 (Settings Components) - 2개
- [x] **KrdsLanguageSwitcher** - 언어 변경 (Language switcher)
- [x] **KrdsResize** - 화면 크기 조정 (Resize)

### 10. 콘텐츠 (Content Components) - 2개
- [X] **KrdsAccessibleMultimedia** - 접근 가능한 미디어 (Accessible multimedia) - 컴포넌트가 아닌 개념 설명만 제공
- [X] **KrdsVisuallyHidden** - 숨긴 콘텐츠 (Visually hidden) - `v-sr-only` 디렉티브로 대체

### 11. 기타 컴포넌트 (Additional Components) - 10개
- [x] **KrdsFormGroup** - 폼 그룹 래퍼
- [x] **KrdsFormLabel** - 폼 레이블
- [x] **KrdsFormHint** - 폼 힌트/도움말
- [ ] **KrdsAlert** (alert.html) - 알림/경고
- [ ] **KrdsGrid** (grid.html) - 그리드 시스템
- [x] **KrdsLayout** (layout.html) - 레이아웃
- [ ] **KrdsCard** (card.html) - 카드 컴포넌트
- [x] **KrdsIcon** - 아이콘 컴포넌트
- [ ] **KrdsProgress** (progress.html) - 진행률 표시기
- [x] **KrdsButtonGroup** - 버튼 그룹


## KRDS v1.1.0 동기화 내역

2025-06-03 커밋 `d6bb184` 기준으로 다음 항목을 반영했습니다.

### SCSS 변경
- [x] `_main_menu.scss` - `.selected` 클래스 추가, `overflow-y` 수정
- [x] `_structured_list.scss` - `.search-list-top` 섹션 추가
- [x] `_tts.scss` - TTS 컴포넌트 SCSS 신규 추가
- [x] `component.scss` - `@import 'tts'` 추가

### SVG 아이콘
- [x] `ico_play.svg` - 재생 아이콘
- [x] `ico_stop.svg` - 정지 아이콘
- [x] `ico_volume.svg` - 볼륨 아이콘
- [x] `_icon.scss` - 아이콘 등록 (ico-play, ico-stop, ico-volume)

### Vue 컴포넌트
- [x] **KrdsTts** - TTS 컴포넌트 구현 + Storybook 스토리
- [x] **KrdsFileUpload** - 스켈레톤에서 완전 구현으로 변경 + 스토리 갱신

### 코드 품질 개선
- [x] `KrdsModal.ts` - `Record<string, any>` → `Record<string, string | boolean | undefined>`, SlotsType `any` 주석 처리
- [x] `KrdsTable.ts` - `TableRow`, `field`, `style`, `classes` 타입에서 `any` 제거

### 미해당 항목 (원본 전용)
- `structured_list_table.html` - 참조용 HTML (Vue 컴포넌트로 이미 구현됨)
- `favicon.html` - 파비콘 마크업 (라이브러리 범위 밖)
- `ui-script.js` - 바닐라 JS (Vue 컴포넌트로 대체됨)
- `package.json` 버전 범프 - 원본 저장소 전용

## 관련 링크

- [KRDS 원본 저장소](https://github.com/KRDS-uiux/krds-uiux)
- [KRDS 공식 웹사이트](https://www.krds.go.kr/)
- [디자인 시스템 가이드](https://www.krds.go.kr/html/site/index.html)
- [Vue 3 공식 문서](https://vuejs.org/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
