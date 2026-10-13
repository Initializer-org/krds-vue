/** 컴포넌트 문서 분류: KRDS 공식 컴포넌트 목록의 분류와 순서 (README 컴포넌트 범위 표와 같음), 마지막은 공식 목록 외 부가 컴포넌트 */
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
      ['페이지네이션 Pagination', 'pagination']
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
      ['이미지 Image', 'image'],
      ['캐러셀 Carousel', 'carousel'],
      ['탭 Tab', 'tabs'],
      ['표 Table', 'table'],
      ['텍스트 목록 Text list', 'text-list']
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
      ['날짜 입력 필드 Date input', 'date-input'],
      ['텍스트 영역 Textarea', 'textarea'],
      ['텍스트 입력 필드 Text input', 'input'],
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
  {
    text: '콘텐츠',
    pages: [
      ['접근 가능한 미디어 Accessible multimedia', 'media'],
      ['숨긴 콘텐츠 v-sr-only', 'sr-only']
    ]
  },
  {
    text: '모바일',
    pages: [
      ['범위슬라이드 Range slider', 'range-slider'],
      ['수량 토글 Quantity toggle', 'quantity-toggle'],
      ['토스트 Toast', 'toast'],
      ['스낵바 Snackbar', 'snackbar'],
      ['탭바 Tab bar', 'tab-bar'],
      ['스플래시 스크린 Splash screen', 'splash-screen']
    ]
  },
  {
    text: '부가 컴포넌트',
    pages: [
      ['폼 그룹 Form group', 'form-group'],
      ['아이콘 Icon', 'icon'],
      ['레이아웃 Layout', 'layout']
    ]
  }
]

/**
 * 문서 페이지별 KRDS 공식 가이드 번호 (https://www.krds.go.kr/html/site/component/component_<번호>.html).
 * { KRDS 공식 이름: 번호 }, 한 페이지가 공식 가이드 여럿을 다루면 여러 개
 */
export const krdsGuides: Record<string, Record<string, string>> = {
  masthead: { '공식 배너': '02_01' },
  identifier: { '운영기관 식별자': '02_02' },
  header: { 헤더: '02_03' },
  footer: { 푸터: '02_04' },
  'skip-link': { '건너뛰기 링크': '03_01' },
  'main-menu': { '메인 메뉴': '03_02' },
  breadcrumb: { 브레드크럼: '03_03' },
  'side-navigation': { '사이드 메뉴': '03_04' },
  'in-page-navigation': { '콘텐츠 내 탐색': '03_05' },
  pagination: { 페이지네이션: '03_06' },
  'tab-bar': { 탭바: '12_07' },
  'structured-list': { '구조화 목록': '04_01' },
  'critical-alerts': { '긴급 공지': '04_02' },
  disclosure: { 디스클로저: '04_04' },
  modal: { 모달: '04_05', 바텀시트: '12_03' },
  badge: { 배지: '04_06' },
  accordion: { 아코디언: '04_07' },
  carousel: { 캐러셀: '04_09' },
  tabs: { 탭: '04_10' },
  table: { 표: '04_11' },
  'text-list': { '텍스트 목록': '04_13' },
  image: { 이미지: '04_08' },
  'splash-screen': { '스플래시 스크린': '12_08' },
  link: { 링크: '05_01' },
  button: { 버튼: '05_02' },
  'floating-button': { '플로팅 버튼': '05_03' },
  radio: { '라디오 버튼': '06_01' },
  checkbox: { 체크박스: '06_02' },
  select: { 셀렉트: '06_03' },
  tag: { 태그: '06_04' },
  'toggle-switch': { '토글 스위치': '06_07' },
  'range-slider': { 범위슬라이드: '12_01' },
  'quantity-toggle': { '수량 토글': '12_04' },
  'step-indicator': { '단계 표시기': '07_01' },
  spinner: { 스피너: '07_02' },
  toast: { 토스트: '12_05' },
  snackbar: { 스낵바: '12_06' },
  panel: { '도움 패널': '08_01', '따라하기 패널': '08_02' },
  'contextual-help': { '맥락적 도움말': '08_03' },
  'coach-mark': { 코치마크: '08_04' },
  tooltip: { 툴팁: '08_05' },
  tts: { 음성지원: '08_06' },
  input: { '텍스트 입력 필드': '09_03' },
  textarea: { '텍스트 영역': '09_02' },
  'date-input': { '날짜 입력 필드': '09_01', 달력: '04_03' },
  'file-upload': { '파일 업로드': '09_04' },
  'language-switcher': { '언어 변경': '10_01' },
  resize: { '화면 크기 조정': '10_02' },
  media: { '접근 가능한 미디어': '11_01' },
  'sr-only': { '숨긴 콘텐츠': '11_02' }
}
