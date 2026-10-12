import type { MainMenuItem } from '@krds.ui/vue'

// KRDS 공식 누리집(https://www.krds.go.kr/html/site/index.html)의 메인 메뉴. 예제라 서비스 패턴 > 신청(#/apply)만 실제 화면으로 이어진다
const links = (...texts: string[]) => texts.map(text => ({ text, href: '#' }))

export const menu: MainMenuItem[] = [
  { text: '시작하기', items: links('KRDS 시작하기', '디자이너', '개발자', '정부 관계자', '리소스 다운로드') },
  {
    text: '디자인 스타일',
    items: links(
      '디자인 스타일 소개',
      '색상',
      '타이포그래피',
      '형태',
      '레이아웃',
      '아이콘',
      '엘리베이션',
      '선명한 화면 모드',
      '디자인 토큰'
    )
  },
  {
    text: '컴포넌트',
    items: links('컴포넌트 소개', '아이덴티티', '탐색', '레이아웃 및 표현', '액션', '선택', '피드백', '도움', '입력', '설정', '콘텐츠')
  },
  {
    text: '기본 패턴',
    items: links(
      '기본 패턴 소개',
      '개인 식별 정보 입력',
      '도움',
      '동의',
      '목록 탐색',
      '사용자 피드백',
      '상세 정보 확인',
      '오류',
      '입력 폼',
      '첨부파일',
      '필터링·정렬',
      '확인'
    )
  },
  {
    text: '서비스 패턴',
    items: [...links('서비스 패턴 소개', '방문', '검색', '로그인'), { text: '신청', href: '#/apply' }, ...links('정책 정보 확인')]
  },
  { text: '소식·소통', items: links('새소식', '자주 묻는 질문', '적용 사례', '자료실', '문의 및 건의') },
  {
    text: 'KRDS 소개',
    items: links('KRDS 소개', 'UI/UX 가이드라인 소개', '디자인 원칙', '네이밍 원칙', '디지털 포용', '이용 안내', '저작권')
  }
]
