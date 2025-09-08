# KRDS Vue 컴포넌트 개발 TODO 리스트

KRDS (Korea Digital Service) HTML을 Vue 3 + TypeScript 컴포넌트로 포팅하는 작업 목록입니다.

## 프로젝트 개요

- **원본**: [KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux)
- **목표**: Vue 3 + TypeScript로 69개 컴포넌트 포팅
- **배포**: NPM 패키지 `@krds.ui/vue`

## 개발 TODO

### 1. Action - 5개
- [x] **KrdsButton** (btn-hierarchy.html) - 버튼 계층구조
  - [x] **KrdsIconButton** (btn-icon.html) - 아이콘 버튼  
  - [x] **KrdsButtonSize** (btn-size.html) - 버튼 크기
  - [x] **KrdsTextButton** (btn-text.html) - 텍스트 버튼

- [x] **KrdsLink** (link.html) - 링크

### 2. 폼 요소 (Form Elements) - 11개

#### 폼 래핑 컴포넌트 (Form Wrapper Components) - 3개
- [x] **KrdsFormGroup** - 폼 그룹 래퍼
- [x] **KrdsFormLabel** - 폼 레이블
- [x] **KrdsFormHint** - 폼 힌트/도움말

#### 입력 필드 (Input Fields) - 4개
- [x] **KrdsInput** (input-text.html) - 텍스트 입력
- [x] **KrdsDateInput** (input-date.html) - 날짜 입력
- [x] **KrdsTextarea** (textarea.html) - 텍스트 영역
- [ ] **KrdsFileUpload** (component_09_04.html) - 파일 업로드 추후에 구현

#### 선택 요소 (Selection Elements) - 4개
- [x] **KrdsCheckbox** (checkbox.html) - 체크박스
- [ ] **KrdsRadio** (radio.html) - 라디오 버튼
- [ ] **KrdsSelect** (select.html) - 셀렉트 박스
- [x] **KrdsToggle** (toggle.html) - 토글 스위치

### 3. 네비게이션 (Navigation) - 6개
- [ ] **KrdsBreadcrumb** (breadcrumb.html) - 브레드크럼
- [ ] **KrdsMobileMenu** (menu-mobile.html) - 모바일 메뉴
- [ ] **KrdsMenu** (menu.html) - 데스크톱 메뉴
- [ ] **KrdsPagination** (pagination.html) - 페이지네이션
- [ ] **KrdsSidemenu** (sidemenu.html) - 사이드 메뉴
- [ ] **KrdsTab** (tab.html) - 탭 인터페이스

### 4. 오버레이 (Overlay Components) - 4개
- [ ] **KrdsAlert** (alert.html) - 알림/경고
- [ ] **KrdsContextualHelp** (contextual-help.html) - 맥락적 도움말
- [ ] **KrdsModal** (modal.html) - 모달 다이얼로그
- [ ] **KrdsTooltip** (tooltip.html) - 툴팁

### 5. 인터랙티브 요소 (Interactive Elements) - 4개
- [ ] **KrdsAccordion** (accordion.html) - 아코디언
- [ ] **KrdsCalendar** (calendar.html) - 캘린더
- [ ] **KrdsCarousel** (carousel.html) - 캐러셀
- [ ] **KrdsStep** (step.html) - 단계 표시기

### 6. 레이아웃 & 구조 (Layout & Structure) - 3개
- [ ] **KrdsGrid** (grid.html) - 그리드 시스템
- [ ] **KrdsLayout** (layout.html) - 레이아웃
- [ ] **KrdsCard** (card.html) - 카드 컴포넌트

### 7. 테이블 & 데이터 (Tables & Data) - 2개
- [ ] **KrdsTable** (table.html) - 테이블
- [ ] **KrdsList** (list.html) - 리스트

### 8. 미디어 & 컨텐츠 (Media & Content) - 4개
- [x] **KrdsBadge** (badge.html) - 배지
- [ ] **KrdsImage** (image.html) - 이미지
- [ ] **KrdsProgress** (progress.html) - 진행률 표시기
- [x] **KrdsTag** (tag.html) - 태그

## 관련 링크

- [KRDS 원본 저장소](https://github.com/KRDS-uiux/krds-uiux)
- [KRDS 공식 웹사이트](https://www.krds.go.kr/)
- [디자인 시스템 가이드](https://www.krds.go.kr/html/site/index.html)
- [Vue 3 공식 문서](https://vuejs.org/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
