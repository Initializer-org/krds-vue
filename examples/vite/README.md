# KRDS Vue 예제 (Vite)

[@krds.ui/vue](https://www.npmjs.com/package/@krds.ui/vue)를 Vite + Vue 3 + TypeScript 프로젝트에서 쓰는 가장 작은 예제입니다. 저장소 README의 빠른 시작(전역 플러그인 등록, 스타일 import, 전역 타입)을 그대로 따릅니다.

[StackBlitz에서 바로 열기](https://stackblitz.com/github/Initializer-org/krds-vue/tree/main/examples/vite)

```bash
npm install
npm run dev     # 개발 서버
npm run build   # 타입 검사(vue-tsc) 후 빌드
```

화면은 [KRDS 공식 누리집](https://www.krds.go.kr/html/site/index.html) 홈을 KRDS Vue 컴포넌트로 옮긴 것입니다. 문구와 화면 구성은 원본을 따르고, 기관명·연락처·적용 사례처럼 실제 기관을 가리키는 값과 정부 상징이 든 로고는 예시로 바꿨습니다. 메인 메뉴의 서비스 패턴 > 신청(`#/apply`)에서 민원 신청 화면으로 이동합니다.

- `src/main.ts`: 플러그인 등록과 스타일 import
- `tsconfig.json`: 전역 컴포넌트 타입(`@krds.ui/vue/global`)
- `pnpm-workspace.yaml`: pnpm으로 설치할 때 '나온 지 하루 안 된 버전 거부' 정책에서 `@krds.ui/vue`만 빼, 방금 배포된 버전도 바로 받음
- `src/App.vue`: 화면 틀과 화면 전환(라우터 없이 `#/apply` 주소로), 전역 토스트 자리(`<KrdsToast />`)
- `src/menu.ts`: 메인 메뉴 데이터
- `src/components/SiteHeader.vue`: 공식 배너·헤더·메인 메뉴(PC·모바일)·언어 변경·화면 크기 조정(v-model)
- `src/components/SiteFooter.vue`: 푸터·운영기관 식별자
- `src/pages/home/`: 홈 화면(탭·배지·카드), 원본 누리집의 홈 스타일(`home.css`)과 이미지
- `src/pages/apply/`: 민원 신청 화면(사이드 메뉴·브레드크럼·단계 표시기·입력·셀렉트·라디오·체크박스·모달·아코디언), 임시 저장 후 `useToast()`로 결과 알림

출처: 본 저작물은 행정안전부에서 2024년 작성하여 공공누리 제1유형으로 개방한 '범정부 UI/UX 디자인시스템(KRDS)'을 이용하였으며, 해당 저작물은 'KRDS 디자인시스템 홈페이지([www.krds.go.kr](https://www.krds.go.kr))'에서 무료로 다운받으실 수 있습니다. `src/pages/home/home.css`와 `src/pages/home/images/`가 이 자료입니다.

저장소 CI는 라이브러리를 패키지 파일로 만들어 이 예제에 설치한 뒤 빌드해, npm에 올라갈 패키지를 배포 전에 검증합니다.
