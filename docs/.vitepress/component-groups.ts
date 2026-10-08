/** 컴포넌트 문서 분류: KRDS 공식 컴포넌트 분류 순서 (README 컴포넌트 범위 표와 같음), 마지막은 공식 목록 외 부가 컴포넌트 */
export const componentGroups: { text: string; pages: [name: string, slug: string][] }[] = [
  {
    text: '아이덴티티',
    pages: [
      ['공식 배너 Masthead', 'masthead'],
      ['운영기관 식별자 Identifier', 'identifier'],
      ['헤더 Header', 'header'],
      ['푸터 Footer', 'footer']
    ]
  },
  {
    text: '탐색',
    pages: [
      ['건너뛰기 링크 Skip link', 'skip-link'],
      ['메인 메뉴 Main menu', 'main-menu'],
      ['브레드크럼 Breadcrumb', 'breadcrumb'],
      ['사이드 메뉴 Side navigation', 'side-navigation'],
      ['콘텐츠 내 탐색 In-page navigation', 'in-page-navigation'],
      ['페이지네이션 Pagination', 'pagination'],
      ['탭바 Tab bar', 'tab-bar']
    ]
  },
  {
    text: '레이아웃 및 표현',
    pages: [
      ['구조화 목록 Structured list', 'structured-list'],
      ['긴급 공지 Critical alerts', 'critical-alerts'],
      ['디스클로저 Disclosure', 'disclosure'],
      ['모달 Modal', 'modal'],
      ['배지 Badge', 'badge'],
      ['아코디언 Accordion', 'accordion'],
      ['캐러셀 Carousel', 'carousel'],
      ['탭 Tab', 'tabs'],
      ['표 Table', 'table'],
      ['텍스트 목록 Text list', 'text-list'],
      ['이미지 Image', 'image'],
      ['스플래시 스크린 Splash screen', 'splash-screen']
    ]
  },
  {
    text: '액션',
    pages: [
      ['링크 Link', 'link'],
      ['버튼 Button', 'button'],
      ['플로팅 버튼 Floating action button', 'floating-button']
    ]
  },
  {
    text: '선택',
    pages: [
      ['라디오 버튼 Radio button', 'radio'],
      ['체크박스 Checkbox', 'checkbox'],
      ['셀렉트 Select', 'select'],
      ['태그 Tag', 'tag'],
      ['토글 스위치 Toggle switch', 'toggle-switch']
    ]
  },
  {
    text: '피드백',
    pages: [
      ['단계 표시기 Step indicator', 'step-indicator'],
      ['스피너 Spinner', 'spinner']
    ]
  },
  {
    text: '도움',
    pages: [
      ['패널 Panel', 'panel'],
      ['맥락적 도움말 Contextual help', 'contextual-help'],
      ['코치마크 Coach mark', 'coach-mark'],
      ['툴팁 Tooltip', 'tooltip'],
      ['음성 지원 TTS', 'tts']
    ]
  },
  {
    text: '입력',
    pages: [
      ['텍스트 입력 필드 Text input', 'input'],
      ['텍스트 영역 Textarea', 'textarea'],
      ['날짜 입력 필드 Date input', 'date-input'],
      ['파일 업로드 File upload', 'file-upload']
    ]
  },
  {
    text: '설정',
    pages: [
      ['언어 변경 Language switcher', 'language-switcher'],
      ['화면 크기 조정 Resize', 'resize']
    ]
  },
  { text: '콘텐츠', pages: [['숨긴 콘텐츠 v-sr-only', 'sr-only']] },
  {
    text: '부가 컴포넌트',
    pages: [
      ['폼 그룹 Form group', 'form-group'],
      ['아이콘 Icon', 'icon'],
      ['레이아웃 Layout', 'layout']
    ]
  }
]
