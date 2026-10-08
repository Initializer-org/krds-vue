# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://www.conventionalcommits.org/) for commit guidelines.

## [0.0.21](https://github.com/Initializer-org/krds-vue/compare/@krds.ui/vue-v0.0.20...@krds.ui/vue-v0.0.21) (2026-10-08)


### Features

* 플로팅 버튼 추가, 단계 표시기·도움 패널·레이아웃 수정 및 문서 사이트 개선 ([#273](https://github.com/Initializer-org/krds-vue/issues/273)) ([7c97cdd](https://github.com/Initializer-org/krds-vue/commit/7c97cddb8b064e180fd0a50960dea6451b33de89))
* 화면 크기 조정(KrdsResize)에 v-model 지원 ([#276](https://github.com/Initializer-org/krds-vue/issues/276)) ([7f6f595](https://github.com/Initializer-org/krds-vue/commit/7f6f595ecf645029eeebef86f8bca760b52dc922))


### Documentation

* 검색 노출 개선 (옛 Storybook 주소 이동, 컴포넌트 목록 페이지, 수정일) 및 문서 코드 타입 검사 ([#271](https://github.com/Initializer-org/krds-vue/issues/271)) ([2e41efb](https://github.com/Initializer-org/krds-vue/commit/2e41efbb08077aa44380df7fc20cedf4d8ed0613))

## [0.0.20](https://github.com/Initializer-org/krds-vue/compare/@krds.ui/vue-v0.0.19...@krds.ui/vue-v0.0.20) (2026-10-07)


### Features

* **date-input:** 공간에 따라 달력을 위·아래로 열고, body에 렌더하는 teleport 옵션 추가 ([#269](https://github.com/Initializer-org/krds-vue/issues/269)) ([c6463ba](https://github.com/Initializer-org/krds-vue/commit/c6463ba7dc8c3dd0ff4711a8d7f01cee03e8bfa2))


### Bug Fixes

* **a11y:** SkipLink id 중복·Table 행 키보드 접근 수정 ([#253](https://github.com/Initializer-org/krds-vue/issues/253)) ([c341c34](https://github.com/Initializer-org/krds-vue/commit/c341c3471f6d270b1017343954683ef76ff0510b))
* **build:** defineComponent에 PURE 주석을 달아 트리셰이킹 복구 ([#243](https://github.com/Initializer-org/krds-vue/issues/243)) ([d0ffcc0](https://github.com/Initializer-org/krds-vue/commit/d0ffcc02f37109d3549038f09dacb4d3d0844583))
* **date-input:** 연/월 목록 표시·선택 표시·이웃 달 표시를 원본 KRDS 동작에 맞춤 ([#254](https://github.com/Initializer-org/krds-vue/issues/254)) ([2ff225c](https://github.com/Initializer-org/krds-vue/commit/2ff225c5aec82dfc0a1f0c6109b7da6a8ca5aa18))
* **file-upload:** 드래그 강조·단일 파일·개수 제한·용량 경계 오류 수정 ([#252](https://github.com/Initializer-org/krds-vue/issues/252)) ([24d6f35](https://github.com/Initializer-org/krds-vue/commit/24d6f35c0604a322b586b4fb078d414fc0bab4f9))
* **main-menu:** 모바일 드로어 포커스 이동·복귀와 aria-controls 연결 수정 ([#256](https://github.com/Initializer-org/krds-vue/issues/256)) ([ac19233](https://github.com/Initializer-org/krds-vue/commit/ac1923353a2407b39f654411b56963244a9ad37d))
* **side-navigation:** 2Depth 링크·id 중복·전환 없는 팝업 포커스 수정 ([#255](https://github.com/Initializer-org/krds-vue/issues/255)) ([1b8f82f](https://github.com/Initializer-org/krds-vue/commit/1b8f82f17cabb91507c7ed7c2f73f145e2cf37d4))


### Chores

* **deps-dev:** bump the development group across 1 directory with 3 updates ([#258](https://github.com/Initializer-org/krds-vue/issues/258)) ([64893c2](https://github.com/Initializer-org/krds-vue/commit/64893c286d7d58bbcda4da50a85a777bf8604f5e))
* **deps-dev:** 개발 의존성 업데이트, jest-dom 7로 올림 ([#265](https://github.com/Initializer-org/krds-vue/issues/265)) ([0259d45](https://github.com/Initializer-org/krds-vue/commit/0259d450c9ea3275f4139311efbf245e6d5fca38))
* **deps:** 패치 버전이 없는 sprintf-js 취약점 audit 예외 처리 ([#250](https://github.com/Initializer-org/krds-vue/issues/250)) ([0cb4da2](https://github.com/Initializer-org/krds-vue/commit/0cb4da26dac9b8f86ff15f28f79f88f3d477ff19))
* 실수로 커밋된 vitest 실패 스크린샷 제거 ([#268](https://github.com/Initializer-org/krds-vue/issues/268)) ([1c51861](https://github.com/Initializer-org/krds-vue/commit/1c51861310da5e22bca4325900cf89defb2a24a2))


### Documentation

* **in-page-navigation:** 스토리에서 스크롤 연동·초기 활성 항목·레이아웃이 깨지던 문제 수정 ([#260](https://github.com/Initializer-org/krds-vue/issues/260)) ([6ea16d7](https://github.com/Initializer-org/krds-vue/commit/6ea16d75a941934c8ee8bb871a281851f175950c))
* **main-menu:** 스토리에 테스트 조작이 남거나 배경 딤이 메뉴를 덮던 문제 수정 ([#261](https://github.com/Initializer-org/krds-vue/issues/261)) ([fb69f9d](https://github.com/Initializer-org/krds-vue/commit/fb69f9dc6bdf9c39194ece41d4c7d6986fc7313e))
* Storybook을 제거하고 VitePress 문서 사이트로 배포·SEO 이전 ([#270](https://github.com/Initializer-org/krds-vue/issues/270)) ([1f6b990](https://github.com/Initializer-org/krds-vue/commit/1f6b990a9998ec74d03c2dba1271b05185be4a06))
* VitePress 문서 사이트 뼈대 추가 (시작하기·버튼·모달·셀렉트) ([#266](https://github.com/Initializer-org/krds-vue/issues/266)) ([e499a9d](https://github.com/Initializer-org/krds-vue/commit/e499a9dedd3c9e53270c3aa23169e0bb354617af))


### Code Refactoring

* 사용처 없는 public export를 deprecated 처리하고 빈 tokens 모듈 제거 ([#246](https://github.com/Initializer-org/krds-vue/issues/246)) ([eadc7cc](https://github.com/Initializer-org/krds-vue/commit/eadc7cc5b11735ecaa263b474c59b6d829d6aa98))


### Tests

* **date-input:** 달력 열림 직후 초점 경합으로 간헐 실패하던 스토리 수정 ([#259](https://github.com/Initializer-org/krds-vue/issues/259)) ([434abad](https://github.com/Initializer-org/krds-vue/commit/434abad58c837fbdc67cde9d154b8f88d094223e))
* **layout:** 항상 통과하던 스크롤 방향 검증을 실제 검증으로 교체 ([#264](https://github.com/Initializer-org/krds-vue/issues/264)) ([c8cf93d](https://github.com/Initializer-org/krds-vue/commit/c8cf93dad0ebea94c50bdf51b941401154afe90d))
* MainMenu·DateInput·FileUpload·SideNavigation 인터랙션 play 테스트 보강 ([#251](https://github.com/Initializer-org/krds-vue/issues/251)) ([11cd0cc](https://github.com/Initializer-org/krds-vue/commit/11cd0cc5d10cbf661a5eeac0e76795859cd0629f))
* play 테스트가 없던 스토리 8종에 인터랙션·구조 테스트 추가 ([#248](https://github.com/Initializer-org/krds-vue/issues/248)) ([bf60aa1](https://github.com/Initializer-org/krds-vue/commit/bf60aa17117c731c5079c077900143a81f7a9cfe))
* 전 컴포넌트 SSR 렌더링 스모크 테스트 추가 ([#247](https://github.com/Initializer-org/krds-vue/issues/247)) ([8917d53](https://github.com/Initializer-org/krds-vue/commit/8917d535d971db1682b36acd5754f2d676cfdf31))
* 컴포넌트 테스트를 Storybook에서 vitest로 이전 ([#263](https://github.com/Initializer-org/krds-vue/issues/263)) ([1c6181c](https://github.com/Initializer-org/krds-vue/commit/1c6181ced6dca0666bf836c46457ba85a71aee20))


### Continuous Integration

* Storybook 인터랙션·a11y 테스트를 CI에서 실행 ([#244](https://github.com/Initializer-org/krds-vue/issues/244)) ([3ccf904](https://github.com/Initializer-org/krds-vue/commit/3ccf9048662b3dd7fa0388ef8a0a9d556e48449c))
* 아무것도 검사하지 않던 Browser Compatibility job 제거 ([#245](https://github.com/Initializer-org/krds-vue/issues/245)) ([24fe47d](https://github.com/Initializer-org/krds-vue/commit/24fe47d32c83738c0cfdf61eaf356fa9ff1f51eb))

## [0.0.19](https://github.com/Initializer-org/krds-vue/compare/@krds.ui/vue-v0.0.18...@krds.ui/vue-v0.0.19) (2026-10-04)


### Features

* **types:** 전역 등록 컴포넌트 타입(global 진입점) 제공 ([#239](https://github.com/Initializer-org/krds-vue/issues/239)) ([7d80cf8](https://github.com/Initializer-org/krds-vue/commit/7d80cf861dcd6e3229b1c5874531ea3448e24ec7))
* **types:** 플러그인 옵션 타입 지정 및 컴포넌트 이름 자동완성 ([#240](https://github.com/Initializer-org/krds-vue/issues/240)) ([159e204](https://github.com/Initializer-org/krds-vue/commit/159e204ea2feec639c80712937980633f539f10d))


### Bug Fixes

* **modal:** SSR 렌더링 실패 및 닫힌 모달의 body overflow 덮어쓰기 수정 ([#238](https://github.com/Initializer-org/krds-vue/issues/238)) ([a43fa5d](https://github.com/Initializer-org/krds-vue/commit/a43fa5debe3e84869a456a62ab9d1a66ed03cd9f))


### Chores

* **deps-dev:** bump sass from 1.105.0 to 1.105.1 ([#236](https://github.com/Initializer-org/krds-vue/issues/236)) ([3be6d6d](https://github.com/Initializer-org/krds-vue/commit/3be6d6d21a7a0bc7cc7a92f480f552912cbf21e4))
* **deps-dev:** bump size-limit and @size-limit/file ([#237](https://github.com/Initializer-org/krds-vue/issues/237)) ([1de66e8](https://github.com/Initializer-org/krds-vue/commit/1de66e89f26ec993b4dfccf7f8f758d9664e85a1))


### Documentation

* Nuxt 사용 가이드 추가 ([#241](https://github.com/Initializer-org/krds-vue/issues/241)) ([da5a97a](https://github.com/Initializer-org/krds-vue/commit/da5a97adb4b01c70c9cba616d8aa09b339c58f57))


### Build System

* oxlint·oxfmt, TS 7 타입 검사 전환 및 Lighthouse job 제거 ([#234](https://github.com/Initializer-org/krds-vue/issues/234)) ([b3ccce7](https://github.com/Initializer-org/krds-vue/commit/b3ccce7e011d8dd0e3e59520f1017757f8167728))

## [0.0.18](https://github.com/Initializer-org/krds-vue/compare/@krds.ui/vue-v0.0.17...@krds.ui/vue-v0.0.18) (2026-10-04)


### Bug Fixes

* **a11y:** 원본 KRDS 기준 접근성 위반 해소 및 검사 CI 차단 상향 ([#232](https://github.com/Initializer-org/krds-vue/issues/232)) ([a5dc4c0](https://github.com/Initializer-org/krds-vue/commit/a5dc4c0944116c6a8d3243ee318fcacd09574096))


### Chores

* **deps-dev:** bump @microsoft/api-extractor from 7.58.12 to 7.59.0 ([#214](https://github.com/Initializer-org/krds-vue/issues/214)) ([647499e](https://github.com/Initializer-org/krds-vue/commit/647499e4536ace7009784d42158a44f1d906a984))
* **deps-dev:** bump @microsoft/api-extractor from 7.59.0 to 7.59.3 ([#228](https://github.com/Initializer-org/krds-vue/issues/228)) ([e748adf](https://github.com/Initializer-org/krds-vue/commit/e748adf59949cb70ba848c63a32654c45c983281))
* **deps-dev:** bump @tsconfig/node24 from 24.0.4 to 24.0.5 ([#209](https://github.com/Initializer-org/krds-vue/issues/209)) ([7db2665](https://github.com/Initializer-org/krds-vue/commit/7db2665b544c37c2bfa6631eb716f2da4a52b3e0))
* **deps-dev:** bump @typescript-eslint/parser from 8.67.0 to 8.69.0 ([#212](https://github.com/Initializer-org/krds-vue/issues/212)) ([ac54374](https://github.com/Initializer-org/krds-vue/commit/ac54374636b40e101e5e63f284a732afbba1add6))
* **deps-dev:** bump @typescript-eslint/parser from 8.69.0 to 8.70.1 ([#230](https://github.com/Initializer-org/krds-vue/issues/230)) ([42e15c0](https://github.com/Initializer-org/krds-vue/commit/42e15c0e0d700e6b85fed44ded800a9e5b706129))
* **deps-dev:** bump playwright from 1.62.1 to 1.63.0 ([#220](https://github.com/Initializer-org/krds-vue/issues/220)) ([254f31f](https://github.com/Initializer-org/krds-vue/commit/254f31fc0d5947a568b98714c11d328016f8ba50))
* **deps-dev:** bump sass from 1.102.0 to 1.103.1 ([#210](https://github.com/Initializer-org/krds-vue/issues/210)) ([15f8b9c](https://github.com/Initializer-org/krds-vue/commit/15f8b9c3aa914fffa04fd07b782bf56c6c77511a))
* **deps-dev:** bump sass from 1.103.1 to 1.105.0 ([#229](https://github.com/Initializer-org/krds-vue/issues/229)) ([74cd5eb](https://github.com/Initializer-org/krds-vue/commit/74cd5eb147f42b2592bc9b291a9ee300921653ab))
* **deps-dev:** bump size-limit and @size-limit/file ([#226](https://github.com/Initializer-org/krds-vue/issues/226)) ([8b4e541](https://github.com/Initializer-org/krds-vue/commit/8b4e54181ca5a31e713e69f0e77ccbc6c1ef6ced))
* **deps-dev:** bump the development group across 1 directory with 6 updates ([#227](https://github.com/Initializer-org/krds-vue/issues/227)) ([bcc3e7b](https://github.com/Initializer-org/krds-vue/commit/bcc3e7bbae7a8b6d29c9c6eb43e914d049a66e95))
* **deps-dev:** bump the development group across 1 directory with 7 updates ([#215](https://github.com/Initializer-org/krds-vue/issues/215)) ([030d2d4](https://github.com/Initializer-org/krds-vue/commit/030d2d4058228a9b873395ee332a06a938940be3))
* **deps-dev:** bump the storybook group across 1 directory with 5 updates ([#207](https://github.com/Initializer-org/krds-vue/issues/207)) ([1feb3e4](https://github.com/Initializer-org/krds-vue/commit/1feb3e4fc9091e2f019eeebab58c92db324f4fec))
* **deps-dev:** bump the storybook group across 1 directory with 5 updates ([#218](https://github.com/Initializer-org/krds-vue/issues/218)) ([c97ad5e](https://github.com/Initializer-org/krds-vue/commit/c97ad5e887b655cb8e5850397d45cc1217009e8c))
* **deps-dev:** bump the vue group across 1 directory with 2 updates ([#213](https://github.com/Initializer-org/krds-vue/issues/213)) ([eff6a78](https://github.com/Initializer-org/krds-vue/commit/eff6a786983d00403dfef8371bf2b2930bf28bb2))
* **deps-dev:** bump the vue group across 1 directory with 2 updates ([#224](https://github.com/Initializer-org/krds-vue/issues/224)) ([1905818](https://github.com/Initializer-org/krds-vue/commit/190581804e272958a29c32a4cf5af07cf4535605))
* **deps:** security audit 취약점 해소 ([#231](https://github.com/Initializer-org/krds-vue/issues/231)) ([7d18833](https://github.com/Initializer-org/krds-vue/commit/7d18833488d1195f26ab7a90e0f62e607534bf21))


### Continuous Integration

* **deps:** bump googleapis/release-please-action from 4 to 5 ([#205](https://github.com/Initializer-org/krds-vue/issues/205)) ([1c07718](https://github.com/Initializer-org/krds-vue/commit/1c077184f0fdb063cd836d29ea293205c5c35c2e))
* npm 배포를 Trusted Publishing(OIDC)으로 전환 ([#233](https://github.com/Initializer-org/krds-vue/issues/233)) ([64bca3d](https://github.com/Initializer-org/krds-vue/commit/64bca3d549a94f736f62fe21d8b53f03d4a73c71))

## [0.0.17](https://github.com/Initializer-org/krds-vue/compare/@krds.ui/vue-v0.0.16...@krds.ui/vue-v0.0.17) (2026-08-15)


### Features

* add help panel ([#26](https://github.com/Initializer-org/krds-vue/issues/26)) ([90b01b2](https://github.com/Initializer-org/krds-vue/commit/90b01b2e9d39ce07384bfd363f693d645ba26258))
* add KrdsModal component ([#47](https://github.com/Initializer-org/krds-vue/issues/47)) ([05f6305](https://github.com/Initializer-org/krds-vue/commit/05f6305b5c4bf335cdeed9d727c64ace2eb589f5))
* add layout, header, footer ([#35](https://github.com/Initializer-org/krds-vue/issues/35)) ([1e5b6f3](https://github.com/Initializer-org/krds-vue/commit/1e5b6f38e56387a0c0b29807f633911976379ee5))
* Improve library packaging, docs, and Storybook SEO ([#173](https://github.com/Initializer-org/krds-vue/issues/173)) ([f81dafa](https://github.com/Initializer-org/krds-vue/commit/f81dafa05c8bb8c30ee2c28940dfd5a662aeb95b))
* KRDS v1.1.0 동기화 — KrdsTts 신규, KrdsFileUpload 완전 구현, 타입 개선 ([#119](https://github.com/Initializer-org/krds-vue/issues/119)) ([0e98aaf](https://github.com/Initializer-org/krds-vue/commit/0e98aaf29e229706ba4b18500cbd0cbe4727dcd3))
* KRDS Vue 디자인 시스템 v0.0.1 ([1b3f4fa](https://github.com/Initializer-org/krds-vue/commit/1b3f4fadda1564bea17e7c1e1806e9c81047c003))
* KrdsAccordion ([#53](https://github.com/Initializer-org/krds-vue/issues/53)) ([9915070](https://github.com/Initializer-org/krds-vue/commit/99150706ffa991bded97187b664883a1c902eb54))
* KrdsLanguageSwitcher,  KrdsResize 추가 ([#33](https://github.com/Initializer-org/krds-vue/issues/33)) ([ebe275d](https://github.com/Initializer-org/krds-vue/commit/ebe275d676fdda263c7403de280514c14cc9a7f4))
* KrdsSelect 컴포넌트 추가 ([#25](https://github.com/Initializer-org/krds-vue/issues/25)) ([9ad9288](https://github.com/Initializer-org/krds-vue/commit/9ad92889adf38b160a79b9292ddfa8a58adfafd6))
* KrdsStepIndicator 컴포넌트 및 코드 개선사항 추가 ([#13](https://github.com/Initializer-org/krds-vue/issues/13)) ([7ad92b0](https://github.com/Initializer-org/krds-vue/commit/7ad92b0992ca59b3dff7ffa2ff162e3640aa9ba2))
* **tabs:** KrdsTabs 탭 컴포넌트 구현 ([#202](https://github.com/Initializer-org/krds-vue/issues/202)) ([f9561fb](https://github.com/Initializer-org/krds-vue/commit/f9561fb40c84c1286e5502fb688592eb4ef9ca91))
* 레이아웃 관련 컴포넌트 추가 (KrdsTable, KrdsTextList, KrdsStructuredList 등) ([#16](https://github.com/Initializer-org/krds-vue/issues/16)) ([7e3a043](https://github.com/Initializer-org/krds-vue/commit/7e3a0434c92372f3d2315168a6df9fc9a70e317e))
* 번들 최적화, 타입 선언 수정, pnpm 11 전환 및 KrdsMainMenu·KrdsCarousel 구현 ([#197](https://github.com/Initializer-org/krds-vue/issues/197)) ([b0df297](https://github.com/Initializer-org/krds-vue/commit/b0df2974f5e753d47e3202ad2e875244c10a66a2))
* 워크플로우 및 주요 종속성의 최신 버전으로 업그레이드 ([#71](https://github.com/Initializer-org/krds-vue/issues/71)) ([077c341](https://github.com/Initializer-org/krds-vue/commit/077c341d604c058a29246b054f6cbdf351f6d9a3))
* 접근성 디렉티브 추가 및 TODO 업데이트 ([#14](https://github.com/Initializer-org/krds-vue/issues/14)) ([81a26ee](https://github.com/Initializer-org/krds-vue/commit/81a26ee8bb0fde80653719ae227a317ab80244b1))
* 탐색 컴포넌트 추가 (KrdsPagination, KrdsSideNavigation) ([#15](https://github.com/Initializer-org/krds-vue/issues/15)) ([965b61e](https://github.com/Initializer-org/krds-vue/commit/965b61eb11f78796e565d52f02b4f84f55435ba3))


### Bug Fixes

* **accordion:** 펼침 상태 스타일 미적용 수정 및 region 역할 추가 ([#193](https://github.com/Initializer-org/krds-vue/issues/193)) ([3d94a79](https://github.com/Initializer-org/krds-vue/commit/3d94a79601bb01e8e1c0f8f9f6e15a49c78eccfc))
* **carousel:** 배너 레이아웃 스타일 보완 및 TODO.md 정리 ([#198](https://github.com/Initializer-org/krds-vue/issues/198)) ([eb7c567](https://github.com/Initializer-org/krds-vue/commit/eb7c567211c10412ae429c160ab58cada1cd3148))
* **components:** 선언만 되고 쓰이지 않던 prop 제거 ([#204](https://github.com/Initializer-org/krds-vue/issues/204)) ([0029d76](https://github.com/Initializer-org/krds-vue/commit/0029d769219911ddfa8cb16d448f481393c2bf55))
* **deps:** 보안 취약점 수정 (glob, js-yaml) ([5ed2d19](https://github.com/Initializer-org/krds-vue/commit/5ed2d19f4c1fbf70656d56d7cfc3bec56dbe23e2))
* Security Audit 취약점 10건 해결 ([#170](https://github.com/Initializer-org/krds-vue/issues/170)) ([cbf124c](https://github.com/Initializer-org/krds-vue/commit/cbf124c2f2047ae52af23778b6bba07303f52eda))
* **select:** readonly 미동작 수정 및 컴포넌트 props·events 문서 자동 생성 ([#203](https://github.com/Initializer-org/krds-vue/issues/203)) ([2039a6e](https://github.com/Initializer-org/krds-vue/commit/2039a6ec20a2cbbc01e93339375d760b7f12c69d))
* **styles:** w-hide·m-hide 반응형 표시 유틸리티 추가 ([#201](https://github.com/Initializer-org/krds-vue/issues/201)) ([e9001e4](https://github.com/Initializer-org/krds-vue/commit/e9001e476e1ad0a403dffa6f33c839374329a8b6))


### Chores

* **ci:** update actions/checkout to v6 across all workflows ([701f914](https://github.com/Initializer-org/krds-vue/commit/701f9149ed612747d9d1007aadbfa204d1d654a2))
* **deps-dev:** bump @microsoft/api-extractor from 7.58.1 to 7.58.8 ([#160](https://github.com/Initializer-org/krds-vue/issues/160)) ([c013b20](https://github.com/Initializer-org/krds-vue/commit/c013b20e2f7b65e0311afa155fd100d325abac75))
* **deps-dev:** bump @typescript-eslint/parser from 8.58.0 to 8.61.0 ([#167](https://github.com/Initializer-org/krds-vue/issues/167)) ([c821892](https://github.com/Initializer-org/krds-vue/commit/c82189263e185366129b84b53be6444563cea82d))
* **deps-dev:** bump @vue/tsconfig from 0.8.1 to 0.9.1 in the vue group across 1 directory ([#144](https://github.com/Initializer-org/krds-vue/issues/144)) ([83267b9](https://github.com/Initializer-org/krds-vue/commit/83267b977f1467320eb1e64e1d0c42797ab1eb7e))
* **deps-dev:** bump jsdom from 26.1.0 to 27.0.0 ([#22](https://github.com/Initializer-org/krds-vue/issues/22)) ([8180638](https://github.com/Initializer-org/krds-vue/commit/818063837d80a9e059a7b9a9324e78e94e650ba4))
* **deps-dev:** bump jsdom from 27.4.0 to 29.0.1 ([#135](https://github.com/Initializer-org/krds-vue/issues/135)) ([06d79ef](https://github.com/Initializer-org/krds-vue/commit/06d79ef00aa9eebc4b85c95b29435d1ce7a7c562))
* **deps-dev:** bump jsdom from 29.0.1 to 29.1.1 ([#162](https://github.com/Initializer-org/krds-vue/issues/162)) ([8cde671](https://github.com/Initializer-org/krds-vue/commit/8cde67165355258574c4acf312cebc1197877d04))
* **deps-dev:** bump playwright from 1.59.1 to 1.60.0 ([#166](https://github.com/Initializer-org/krds-vue/issues/166)) ([5dbf839](https://github.com/Initializer-org/krds-vue/commit/5dbf839437e3c29d9e6db2a7d583e38873bd0728))
* **deps-dev:** bump sass from 1.99.0 to 1.100.0 ([#168](https://github.com/Initializer-org/krds-vue/issues/168)) ([79a83a4](https://github.com/Initializer-org/krds-vue/commit/79a83a410d9a1d7b7022df05a0feb55219dd9ea6))
* **deps-dev:** bump the development group across 1 directory with 5 updates ([#172](https://github.com/Initializer-org/krds-vue/issues/172)) ([e561ae7](https://github.com/Initializer-org/krds-vue/commit/e561ae75788049e64e72dbf02f683014d8e47d6f))
* **deps-dev:** bump the storybook group across 1 directory with 5 updates ([#146](https://github.com/Initializer-org/krds-vue/issues/146)) ([b002af8](https://github.com/Initializer-org/krds-vue/commit/b002af802ac3947730029b875a07e29e9f06c498))
* **deps-dev:** bump the storybook group with 5 updates ([#28](https://github.com/Initializer-org/krds-vue/issues/28)) ([633995a](https://github.com/Initializer-org/krds-vue/commit/633995a11c23f76620367657824e9174fccab85c))
* **deps-dev:** bump the vue group across 1 directory with 5 updates ([#169](https://github.com/Initializer-org/krds-vue/issues/169)) ([e5404e6](https://github.com/Initializer-org/krds-vue/commit/e5404e6b3f28b672b1946de73b69f1d4d243c3d2))
* **deps:** resolve security audit failures and update dependencies ([#192](https://github.com/Initializer-org/krds-vue/issues/192)) ([53080b8](https://github.com/Initializer-org/krds-vue/commit/53080b809a6befd1b1322b224690787e4ecd946f))
* **deps:** update dependencies ([#118](https://github.com/Initializer-org/krds-vue/issues/118)) ([073c7ce](https://github.com/Initializer-org/krds-vue/commit/073c7ce1d24c775551a4980cbceb12c766d569a1))
* **deps:** update dependencies, including storybook (10.1.10), vitest (4.0.16), vue (3.5.26), and more ([eb6db4f](https://github.com/Initializer-org/krds-vue/commit/eb6db4f62439eb698d83e7a20961de7ce64c8aa8))
* **deps:** update dependencies, including storybook (10.3.4), vite (8.0.3), and rollup (4.60.1) ([6e49414](https://github.com/Initializer-org/krds-vue/commit/6e494142b354ddd15cacfa996410215eea135015))
* **release:** 0.0.1 ([d397cfb](https://github.com/Initializer-org/krds-vue/commit/d397cfb0cab8c7d8b965d88e3e73cd1366863f00))
* **release:** 0.0.10 ([eee1a2c](https://github.com/Initializer-org/krds-vue/commit/eee1a2cfe061dd3aee1c39992a682b47b9f6199a))
* **release:** 0.0.11 ([c8feb10](https://github.com/Initializer-org/krds-vue/commit/c8feb106ff0a139a97c59a9ab116cccde89366b3))
* **release:** 0.0.12 ([461d32c](https://github.com/Initializer-org/krds-vue/commit/461d32c0423b06262d56d23d31bd74e1577ad1a1))
* **release:** 0.0.13 ([1cd0199](https://github.com/Initializer-org/krds-vue/commit/1cd01999731d12694249663c6c54c9a4b7c586d1))
* **release:** 0.0.14 ([3fd1637](https://github.com/Initializer-org/krds-vue/commit/3fd163730e30977eb3f54cdc754de43bb4c08103))
* **release:** 0.0.15 ([ed97fc2](https://github.com/Initializer-org/krds-vue/commit/ed97fc2198ac4da807c74a36256fb91a07ca584a))
* **release:** 0.0.16 ([33e3faf](https://github.com/Initializer-org/krds-vue/commit/33e3faf89f08651d50e9080e777d69c1fce72cdb))
* **release:** 0.0.2 ([e9c5fd2](https://github.com/Initializer-org/krds-vue/commit/e9c5fd29505e926acfee43064b1000753ae47d96))
* **release:** 0.0.4 ([1d3d555](https://github.com/Initializer-org/krds-vue/commit/1d3d555f39f3ad7a36587ed2316f260faf724eed))
* **release:** 0.0.5 ([19434cf](https://github.com/Initializer-org/krds-vue/commit/19434cfb6732cf3e05c9840da1b0924492ab4dbc))
* **release:** 0.0.6 ([f1e3755](https://github.com/Initializer-org/krds-vue/commit/f1e37557162a1f21901948187dbb860f3bfb4381))
* **release:** 0.0.7 ([6a624ba](https://github.com/Initializer-org/krds-vue/commit/6a624baaa404a7e1466eb643a53d3acfa60afcf2))
* **release:** 0.0.8 ([195fa1e](https://github.com/Initializer-org/krds-vue/commit/195fa1e80445b84e76acf3f0d0e0e018fa8b477a))
* **release:** 0.0.9 ([196ed70](https://github.com/Initializer-org/krds-vue/commit/196ed70ad788ca5e83cd75a07a7e29b4005e6ee4))
* 누락된 컴포넌트 10종 공개 export 추가 ([#171](https://github.com/Initializer-org/krds-vue/issues/171)) ([6e34935](https://github.com/Initializer-org/krds-vue/commit/6e349359eb6bab78b4318257e1abaa031646b18a))


### Code Refactoring

* **components:** SFC → h() 렌더 함수 전환 (1/3 배치) ([#194](https://github.com/Initializer-org/krds-vue/issues/194)) ([2641999](https://github.com/Initializer-org/krds-vue/commit/26419993a358e6f1cba48b5686849d2f77215da4))
* **components:** SFC → h() 렌더 함수 전환 (2/3 배치) ([#195](https://github.com/Initializer-org/krds-vue/issues/195)) ([4915405](https://github.com/Initializer-org/krds-vue/commit/4915405a01f9ae85fa989e290395da6557fc8bee))
* **components:** SFC → h() 렌더 함수 전환 (3/3 배치, 완료) ([#196](https://github.com/Initializer-org/krds-vue/issues/196)) ([9142fd5](https://github.com/Initializer-org/krds-vue/commit/9142fd56d4d6dbdf9ba08099f520b2c5b3d81bf9))
* KrdsHelpPanel을 KrdsPanel로 변경 ([#34](https://github.com/Initializer-org/krds-vue/issues/34)) ([e57c853](https://github.com/Initializer-org/krds-vue/commit/e57c8531509bc2e3245d5dc7654d962eb8904894))


### Tests

* ui 테스트 보강 ([#142](https://github.com/Initializer-org/krds-vue/issues/142)) ([0634ace](https://github.com/Initializer-org/krds-vue/commit/0634acec0a3d4dfe52b1318aeca1240fef44fb20))


### Build System

* **ci:** CI/CD 설정 및 entrypoint 업데이트 ([5723b9c](https://github.com/Initializer-org/krds-vue/commit/5723b9c00b107523520319e5656c459c9ae3f096))
* standard-version을 release-please로 전환하고 의존성 최신화 ([#199](https://github.com/Initializer-org/krds-vue/issues/199)) ([833ae82](https://github.com/Initializer-org/krds-vue/commit/833ae82696663b57e4bd4aba9d9290590dc45cc0))


### Continuous Integration

* **deps:** bump actions/upload-pages-artifact from 4 to 5 ([#152](https://github.com/Initializer-org/krds-vue/issues/152)) ([0ad68ca](https://github.com/Initializer-org/krds-vue/commit/0ad68cae3f77bd6454c14e29d2daff241e808d66))
* **deps:** bump pnpm/action-setup from 5 to 6 ([#145](https://github.com/Initializer-org/krds-vue/issues/145)) ([9b06a0b](https://github.com/Initializer-org/krds-vue/commit/9b06a0b442deee6fe68f438af9870f3a6ce2c506))

### [0.0.16](https://github.com/Initializer-org/krds-vue/compare/v0.0.15...v0.0.16) (2026-08-12)


### Features

* 번들 최적화, 타입 선언 수정, pnpm 11 전환 및 KrdsMainMenu·KrdsCarousel 구현 ([#197](https://github.com/Initializer-org/krds-vue/issues/197)) ([b0df297](https://github.com/Initializer-org/krds-vue/commit/b0df2974f5e753d47e3202ad2e875244c10a66a2))

### [0.0.15](https://github.com/Initializer-org/krds-vue/compare/v0.0.14...v0.0.15) (2026-08-10)


### Bug Fixes

* **accordion:** 펼침 상태 스타일 미적용 수정 및 region 역할 추가 ([#193](https://github.com/Initializer-org/krds-vue/issues/193)) ([3d94a79](https://github.com/Initializer-org/krds-vue/commit/3d94a79601bb01e8e1c0f8f9f6e15a49c78eccfc))


### Chores

* **deps:** resolve security audit failures and update dependencies ([#192](https://github.com/Initializer-org/krds-vue/issues/192)) ([53080b8](https://github.com/Initializer-org/krds-vue/commit/53080b809a6befd1b1322b224690787e4ecd946f))


### Code Refactoring

* **components:** SFC → h() 렌더 함수 전환 (1/3 배치) ([#194](https://github.com/Initializer-org/krds-vue/issues/194)) ([2641999](https://github.com/Initializer-org/krds-vue/commit/26419993a358e6f1cba48b5686849d2f77215da4))
* **components:** SFC → h() 렌더 함수 전환 (2/3 배치) ([#195](https://github.com/Initializer-org/krds-vue/issues/195)) ([4915405](https://github.com/Initializer-org/krds-vue/commit/4915405a01f9ae85fa989e290395da6557fc8bee))
* **components:** SFC → h() 렌더 함수 전환 (3/3 배치, 완료) ([#196](https://github.com/Initializer-org/krds-vue/issues/196)) ([9142fd5](https://github.com/Initializer-org/krds-vue/commit/9142fd56d4d6dbdf9ba08099f520b2c5b3d81bf9))

### [0.0.14](https://github.com/Initializer-org/krds-vue/compare/v0.0.13...v0.0.14) (2026-06-09)


### Features

* Improve library packaging, docs, and Storybook SEO ([#173](https://github.com/Initializer-org/krds-vue/issues/173)) ([f81dafa](https://github.com/Initializer-org/krds-vue/commit/f81dafa05c8bb8c30ee2c28940dfd5a662aeb95b))


### Bug Fixes

* Security Audit 취약점 10건 해결 ([#170](https://github.com/Initializer-org/krds-vue/issues/170)) ([cbf124c](https://github.com/Initializer-org/krds-vue/commit/cbf124c2f2047ae52af23778b6bba07303f52eda))


### Tests

* ui 테스트 보강 ([#142](https://github.com/Initializer-org/krds-vue/issues/142)) ([0634ace](https://github.com/Initializer-org/krds-vue/commit/0634acec0a3d4dfe52b1318aeca1240fef44fb20))


### Continuous Integration

* **deps:** bump actions/upload-pages-artifact from 4 to 5 ([#152](https://github.com/Initializer-org/krds-vue/issues/152)) ([0ad68ca](https://github.com/Initializer-org/krds-vue/commit/0ad68cae3f77bd6454c14e29d2daff241e808d66))
* **deps:** bump pnpm/action-setup from 5 to 6 ([#145](https://github.com/Initializer-org/krds-vue/issues/145)) ([9b06a0b](https://github.com/Initializer-org/krds-vue/commit/9b06a0b442deee6fe68f438af9870f3a6ce2c506))


### Chores

* **deps-dev:** bump @microsoft/api-extractor from 7.58.1 to 7.58.8 ([#160](https://github.com/Initializer-org/krds-vue/issues/160)) ([c013b20](https://github.com/Initializer-org/krds-vue/commit/c013b20e2f7b65e0311afa155fd100d325abac75))
* **deps-dev:** bump @typescript-eslint/parser from 8.58.0 to 8.61.0 ([#167](https://github.com/Initializer-org/krds-vue/issues/167)) ([c821892](https://github.com/Initializer-org/krds-vue/commit/c82189263e185366129b84b53be6444563cea82d))
* **deps-dev:** bump @vue/tsconfig from 0.8.1 to 0.9.1 in the vue group across 1 directory ([#144](https://github.com/Initializer-org/krds-vue/issues/144)) ([83267b9](https://github.com/Initializer-org/krds-vue/commit/83267b977f1467320eb1e64e1d0c42797ab1eb7e))
* **deps-dev:** bump jsdom from 27.4.0 to 29.0.1 ([#135](https://github.com/Initializer-org/krds-vue/issues/135)) ([06d79ef](https://github.com/Initializer-org/krds-vue/commit/06d79ef00aa9eebc4b85c95b29435d1ce7a7c562))
* **deps-dev:** bump jsdom from 29.0.1 to 29.1.1 ([#162](https://github.com/Initializer-org/krds-vue/issues/162)) ([8cde671](https://github.com/Initializer-org/krds-vue/commit/8cde67165355258574c4acf312cebc1197877d04))
* **deps-dev:** bump playwright from 1.59.1 to 1.60.0 ([#166](https://github.com/Initializer-org/krds-vue/issues/166)) ([5dbf839](https://github.com/Initializer-org/krds-vue/commit/5dbf839437e3c29d9e6db2a7d583e38873bd0728))
* **deps-dev:** bump sass from 1.99.0 to 1.100.0 ([#168](https://github.com/Initializer-org/krds-vue/issues/168)) ([79a83a4](https://github.com/Initializer-org/krds-vue/commit/79a83a410d9a1d7b7022df05a0feb55219dd9ea6))
* **deps-dev:** bump the development group across 1 directory with 5 updates ([#172](https://github.com/Initializer-org/krds-vue/issues/172)) ([e561ae7](https://github.com/Initializer-org/krds-vue/commit/e561ae75788049e64e72dbf02f683014d8e47d6f))
* **deps-dev:** bump the storybook group across 1 directory with 5 updates ([#146](https://github.com/Initializer-org/krds-vue/issues/146)) ([b002af8](https://github.com/Initializer-org/krds-vue/commit/b002af802ac3947730029b875a07e29e9f06c498))
* **deps-dev:** bump the vue group across 1 directory with 5 updates ([#169](https://github.com/Initializer-org/krds-vue/issues/169)) ([e5404e6](https://github.com/Initializer-org/krds-vue/commit/e5404e6b3f28b672b1946de73b69f1d4d243c3d2))
* **deps:** update dependencies, including storybook (10.3.4), vite (8.0.3), and rollup (4.60.1) ([6e49414](https://github.com/Initializer-org/krds-vue/commit/6e494142b354ddd15cacfa996410215eea135015))
* 누락된 컴포넌트 10종 공개 export 추가 ([#171](https://github.com/Initializer-org/krds-vue/issues/171)) ([6e34935](https://github.com/Initializer-org/krds-vue/commit/6e349359eb6bab78b4318257e1abaa031646b18a))

### [0.0.13](https://github.com/Initializer-org/krds-vue/compare/v0.0.12...v0.0.13) (2026-02-23)


### Chores

* **deps:** update dependencies ([#118](https://github.com/Initializer-org/krds-vue/issues/118)) ([073c7ce](https://github.com/Initializer-org/krds-vue/commit/073c7ce1d24c775551a4980cbceb12c766d569a1))

### [0.0.12](https://github.com/Initializer-org/krds-vue/compare/v0.0.11...v0.0.12) (2025-12-19)


### Chores

* **deps:** update dependencies, including storybook (10.1.10), vitest (4.0.16), vue (3.5.26), and more ([eb6db4f](https://github.com/Initializer-org/krds-vue/commit/eb6db4f62439eb698d83e7a20961de7ce64c8aa8))

### [0.0.11](https://github.com/Initializer-org/krds-vue/compare/v0.0.10...v0.0.11) (2025-11-26)


### Features

* KrdsAccordion ([#53](https://github.com/Initializer-org/krds-vue/issues/53)) ([9915070](https://github.com/Initializer-org/krds-vue/commit/99150706ffa991bded97187b664883a1c902eb54))
* 워크플로우 및 주요 종속성의 최신 버전으로 업그레이드 ([#71](https://github.com/Initializer-org/krds-vue/issues/71)) ([077c341](https://github.com/Initializer-org/krds-vue/commit/077c341d604c058a29246b054f6cbdf351f6d9a3))


### Bug Fixes

* **deps:** 보안 취약점 수정 (glob, js-yaml) ([5ed2d19](https://github.com/Initializer-org/krds-vue/commit/5ed2d19f4c1fbf70656d56d7cfc3bec56dbe23e2))


### Chores

* **ci:** update actions/checkout to v6 across all workflows ([701f914](https://github.com/Initializer-org/krds-vue/commit/701f9149ed612747d9d1007aadbfa204d1d654a2))

### [0.0.10](https://github.com/Initializer-org/krds-vue/compare/v0.0.9...v0.0.10) (2025-10-06)


### Features

* add KrdsModal component ([#47](https://github.com/Initializer-org/krds-vue/issues/47)) ([05f6305](https://github.com/Initializer-org/krds-vue/commit/05f6305b5c4bf335cdeed9d727c64ace2eb589f5))

### [0.0.9](https://github.com/Initializer-org/krds-vue/compare/v0.0.8...v0.0.9) (2025-09-30)


### Features

* add layout, header, footer ([#35](https://github.com/Initializer-org/krds-vue/issues/35)) ([1e5b6f3](https://github.com/Initializer-org/krds-vue/commit/1e5b6f38e56387a0c0b29807f633911976379ee5))

### [0.0.8](https://github.com/Initializer-org/krds-vue/compare/v0.0.7...v0.0.8) (2025-09-24)


### Features

* KrdsLanguageSwitcher,  KrdsResize 추가 ([#33](https://github.com/Initializer-org/krds-vue/issues/33)) ([ebe275d](https://github.com/Initializer-org/krds-vue/commit/ebe275d676fdda263c7403de280514c14cc9a7f4))


### Code Refactoring

* KrdsHelpPanel을 KrdsPanel로 변경 ([#34](https://github.com/Initializer-org/krds-vue/issues/34)) ([e57c853](https://github.com/Initializer-org/krds-vue/commit/e57c8531509bc2e3245d5dc7654d962eb8904894))

### [0.0.7](https://github.com/Initializer-org/krds-vue/compare/v0.0.6...v0.0.7) (2025-09-23)


### Features

* add help panel ([#26](https://github.com/Initializer-org/krds-vue/issues/26)) ([90b01b2](https://github.com/Initializer-org/krds-vue/commit/90b01b2e9d39ce07384bfd363f693d645ba26258))


### Chores

* **deps-dev:** bump the storybook group with 5 updates ([#28](https://github.com/Initializer-org/krds-vue/issues/28)) ([633995a](https://github.com/Initializer-org/krds-vue/commit/633995a11c23f76620367657824e9174fccab85c))

### [0.0.6](https://github.com/Initializer-org/krds-vue/compare/v0.0.5...v0.0.6) (2025-09-15)


### Features

* KrdsSelect 컴포넌트 추가 ([#25](https://github.com/Initializer-org/krds-vue/issues/25)) ([9ad9288](https://github.com/Initializer-org/krds-vue/commit/9ad92889adf38b160a79b9292ddfa8a58adfafd6))

### [0.0.5](https://github.com/Initializer-org/krds-vue/compare/v0.0.4...v0.0.5) (2025-09-15)


### Features

* 레이아웃 관련 컴포넌트 추가 (KrdsTable, KrdsTextList, KrdsStructuredList 등) ([#16](https://github.com/Initializer-org/krds-vue/issues/16)) ([7e3a043](https://github.com/Initializer-org/krds-vue/commit/7e3a0434c92372f3d2315168a6df9fc9a70e317e))


### Chores

* **deps-dev:** bump jsdom from 26.1.0 to 27.0.0 ([#22](https://github.com/Initializer-org/krds-vue/issues/22)) ([8180638](https://github.com/Initializer-org/krds-vue/commit/818063837d80a9e059a7b9a9324e78e94e650ba4))

### [0.0.4](https://github.com/Initializer-org/krds-vue/compare/v0.0.2...v0.0.4) (2025-09-11)

### [0.0.2](https://github.com/Initializer-org/krds-vue/compare/v0.0.1...v0.0.2) (2025-09-11)


### Features

* 접근성 디렉티브 추가 및 TODO 업데이트 ([#14](https://github.com/Initializer-org/krds-vue/issues/14)) ([81a26ee](https://github.com/Initializer-org/krds-vue/commit/81a26ee8bb0fde80653719ae227a317ab80244b1))
* 탐색 컴포넌트 추가 (KrdsPagination, KrdsSideNavigation) ([#15](https://github.com/Initializer-org/krds-vue/issues/15)) ([965b61e](https://github.com/Initializer-org/krds-vue/commit/965b61eb11f78796e565d52f02b4f84f55435ba3))


### Build System

* **ci:** CI/CD 설정 및 entrypoint 업데이트 ([5723b9c](https://github.com/Initializer-org/krds-vue/commit/5723b9c00b107523520319e5656c459c9ae3f096))

### 0.0.1 (2025-09-08)


### Features

* KRDS Vue 디자인 시스템 v0.0.1 ([1b3f4fa](https://github.com/Initializer-org/krds-vue/commit/1b3f4fadda1564bea17e7c1e1806e9c81047c003))
