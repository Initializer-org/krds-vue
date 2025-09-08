# Contributing to KRDS Vue

KRDS Vue에 기여해주셔서 감사합니다!

## 개발 환경 설정

### 필수 요구사항

- Node.js >= 20
- pnpm >= 9
- Git

### 설정 단계

1. **저장소 클론**
```bash
git clone https://github.com/Initializer-org/krds-vue.git
cd krds-vue
```

2. **의존성 설치**
```bash
pnpm install
```

3. **개발 서버 실행**
```bash
pnpm dev          # Vite 개발 서버
pnpm storybook    # Storybook 개발 서버
```

## 개발 가이드

### 브랜치 전략

- `main`: 배포용 안정 버전
- `develop`: 개발 진행 중인 브랜치
- `feature/*`: 새로운 기능 개발
- `fix/*`: 버그 수정
- `docs/*`: 문서 업데이트

### 코드 스타일

프로젝트는 다음 도구들을 사용합니다:

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포매팅
- **TypeScript**: 타입 검사

```bash
pnpm lint        # 린트 실행
pnpm format      # 코드 포매팅
pnpm type-check  # 타입 체크
```

### 컴포넌트 개발

1. **컴포넌트 구조**
```
src/components/KrdsNewComponent/
├── KrdsNewComponent.ts         # 컴포넌트 로직
├── KrdsNewComponent.stories.ts # Storybook 스토리
├── index.ts                    # Export
└── __tests__/                  # 테스트 (선택사항)
    └── KrdsNewComponent.test.ts
```

2. **네이밍 규칙**
- 컴포넌트: `KrdsComponentName` (PascalCase)
- Props 인터페이스: `KrdsComponentNameProps`
- Emits 인터페이스: `KrdsComponentNameEmits`

3. **필수 포함사항**
- TypeScript 타입 정의
- Storybook 스토리
- JSDoc 주석
- 접근성 고려사항

### 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**타입:**
- `feat`: 새로운 기능
- `fix`: 버그 수정  
- `docs`: 문서 업데이트
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

**예시:**
```
feat(button): add loading state support

Add loading prop and spinner icon to KrdsButton component
- Show spinner when loading is true
- Disable button interactions during loading
- Update Storybook stories

Closes #123
```

## Pull Request 가이드

### PR 제출 전 체크리스트

- [ ] 코드가 린트 규칙을 통과하는지 확인
- [ ] 타입 체크 통과 확인
- [ ] 빌드 성공 확인
- [ ] 관련 Storybook 스토리 업데이트
- [ ] 문서 업데이트 (필요시)
- [ ] 브레이킹 체인지 여부 명시

### PR 템플릿

PR 제출 시 자동으로 표시되는 템플릿을 작성해주세요.

## 이슈 리포팅

### 버그 리포트

버그를 발견했다면 [Bug Report 템플릿](https://github.com/Initializer-org/krds-vue/issues/new?template=bug_report.yml)을 사용해주세요.

### 기능 요청

새로운 기능을 제안하고 싶다면 [Feature Request 템플릿](https://github.com/Initializer-org/krds-vue/issues/new?template=feature_request.yml)을 사용해주세요.

## 접근성 가이드라인

KRDS Vue는 접근성을 최우선으로 합니다:

- **WCAG 2.1 AA 준수**: 모든 컴포넌트는 WCAG 2.1 AA 기준을 만족해야 합니다
- **키보드 내비게이션**: Tab, Enter, Space, Arrow keys 지원
- **스크린 리더**: 적절한 ARIA 속성과 레이블 제공
- **색상 대비**: 최소 4.5:1 대비율 유지
- **포커스 관리**: 명확한 포커스 인디케이터 제공

### 접근성 테스트 도구

- **axe-core**: 자동 접근성 검사
- **NVDA/JAWS**: 스크린 리더 테스트
- **Keyboard navigation**: 키보드 전용 테스트

## 디자인 시스템 준수

### KRDS 가이드라인

- [KRDS 공식 문서](https://www.krds.kr) 참조
- 정부 웹서비스 UI/UX 가이드라인 준수
- 일관된 디자인 토큰 사용

### 컬러 시스템

```scss
// 정부 표준 색상 사용
$primary-color: #2E5BFF;
$secondary-color: #7B8794;
$success-color: #00C875;
```

## 질문 및 도움

- **GitHub Discussions**: 일반적인 질문과 토론
- **GitHub Issues**: 버그 리포트와 기능 요청
- **Discord**: 실시간 커뮤니케이션 (링크 준비 중)

## 라이선스

기여하신 코드는 MIT 라이선스 하에 배포됩니다.

---

다시 한번 KRDS Vue에 기여해주셔서 감사합니다!