## 설명

레이아웃 관련 새로운 컴포넌트들을 추가했습니다. 데이터 표시, 리스트, 중요 알림, 정보 공개 등 다양한 UI 패턴을 지원하는 컴포넌트들을 구현했습니다.

## 변경 유형

- [x] 새로운 기능 (기존 기능을 손상시키지 않는 기능 추가)
- [x] 문서 업데이트

## 테스트

- [x] 수동 테스트 완료
- [x] Storybook 스토리 업데이트/추가
- [x] 시각적 회귀 테스트 (해당하는 경우)

## 주요 변경사항

### 새로운 컴포넌트
1. **KrdsTable** - 테이블 컴포넌트
   - 정렬 기능 지원
   - 커스터마이징 가능한 헤더와 셀
   - no-data 슬롯 지원
   - 접근성 고려 (caption, scope 속성)

2. **KrdsTextList** - 텍스트 리스트 컴포넌트
   - 다양한 리스트 타입 지원 (unordered, ordered, plain)
   - 간격 조절 가능 (condensed, normal, spacious)

3. **KrdsStructuredList** - 구조화된 리스트 컴포넌트
   - 일관된 스타일과 구조를 가진 리스트
   - 복잡한 정보를 체계적으로 표시

4. **KrdsDisclosure** - 정보 공개 컴포넌트
   - 접을 수 있는 콘텐츠 영역
   - 화살표 아이콘과 애니메이션 효과

5. **KrdsCriticalAlerts** - 중요 알림 컴포넌트
   - 다양한 알림 타입 (info, warning, error, success)
   - 사용자 경험을 방해하지 않는 디자인

6. **KrdsImage** - 이미지 컴포넌트 (개념 설명)
   - 이미지 처리 관련 개념 설명 제공

7. **KrdsSplashScreen** - 스플래시 스크린 컴포넌트 (개념 설명)
   - 스플래시 스크린 관련 개념 설명 제공

### 기타 변경사항
- Storybook addon-onboarding 제거
- TODO.md 업데이트 (완료된 컴포넌트 체크)

## 접근성

- [x] WCAG 2.1 가이드라인 준수
- [x] 키보드 내비게이션 테스트 완료
- [x] 색상 대비 검증 완료

## 체크리스트

- [x] 내 코드가 이 프로젝트의 스타일 가이드라인을 따릅니다
- [x] 내 코드에 대한 자체 검토를 수행했습니다
- [x] 특히 이해하기 어려운 부분에 주석을 달았습니다
- [x] 문서에 해당하는 변경 사항을 반영했습니다
- [x] 내 변경 사항으로 인한 새로운 경고가 발생하지 않습니다
- [x] 새로운 테스트와 기존 단위 테스트가 로컬에서 통과합니다

## 추가 참고사항

- 각 컴포넌트는 Storybook에서 확인 가능합니다
- KrdsTable 컴포넌트는 특히 접근성을 고려하여 caption과 scope 속성을 포함했습니다
- KrdsImage와 KrdsSplashScreen은 개념 설명만 제공하는 placeholder 컴포넌트입니다

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>