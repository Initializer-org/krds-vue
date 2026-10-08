# KRDS Vue 예제 (Vite)

[@krds.ui/vue](https://www.npmjs.com/package/@krds.ui/vue)를 Vite + Vue 3 + TypeScript 프로젝트에서 쓰는 가장 작은 예제입니다. 저장소 README의 빠른 시작(전역 플러그인 등록, 스타일 import, 전역 타입)을 그대로 따릅니다.

[StackBlitz에서 바로 열기](https://stackblitz.com/github/Initializer-org/krds-vue/tree/main/examples/vite)

```bash
npm install
npm run dev     # 개발 서버
npm run build   # 타입 검사(vue-tsc) 후 빌드
```

- `src/main.ts`: 플러그인 등록과 스타일 import
- `tsconfig.json`: 전역 컴포넌트 타입(`@krds.ui/vue/global`)
- `src/App.vue`: 입력·버튼·모달·화면 크기 조정(v-model)·플로팅 버튼

저장소 CI는 라이브러리를 패키지 파일로 만들어 이 예제에 설치한 뒤 빌드해, npm에 올라갈 패키지를 배포 전에 검증합니다.
