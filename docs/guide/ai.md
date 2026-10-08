# AI로 개발하기

Claude Code, Cursor, GitHub Copilot 같은 AI 코딩 도구가 KRDS Vue를 올바르게 쓰도록 지침 파일과 AI용 문서를 제공합니다. AI가 문서에 없는 속성을 지어내거나 KRDS 구조를 벗어난 마크업을 만드는 일을 줄일 수 있습니다.

## 지침 파일

[KRDS Vue 개발 지침](./ai-guidelines)에 KRDS Vue로 화면을 만들 때 AI가 따라야 할 규칙을 정리했습니다. 원본 파일은 <a href="/ai/guidelines.md" download="krds-vue-guidelines.md">guidelines.md</a>로 내려받을 수 있습니다.

- 설치와 설정 (스타일, 전역 등록, 전역 타입, Nuxt)
- 공공 누리집 페이지 레이아웃 (공식 배너, 헤더, 메인 메뉴, 사이드 메뉴, 푸터, 운영기관 식별자)
- 폼 구성과 `v-model` 사용법
- 자주 쓰는 컴포넌트의 핵심 속성
- 접근성, 화면 모드(고대비), 하지 말 것

프로젝트에 내려받아 쓰는 AI 도구의 규칙 파일로 등록합니다.

```bash
curl -fsSL https://krds.initializer.org/ai/guidelines.md -o krds-vue-guidelines.md
```

## 도구별 규칙 파일

| 도구                             | 규칙 파일 위치                    | 등록 방법                                                                        |
| -------------------------------- | --------------------------------- | -------------------------------------------------------------------------------- |
| Claude Code                      | `CLAUDE.md`                       | 내용을 붙여 넣거나 `@krds-vue-guidelines.md` 한 줄로 가져옵니다.                 |
| Cursor                           | `.cursor/rules/krds-vue.mdc`      | 파일 맨 위에 `alwaysApply: true`를 담은 frontmatter를 두고 내용을 붙여 넣습니다. |
| GitHub Copilot (VS Code, GitHub) | `.github/copilot-instructions.md` | 내용을 붙여 넣습니다.                                                            |
| Codex 등 `AGENTS.md`를 읽는 도구 | `AGENTS.md`                       | 내용을 붙여 넣습니다.                                                            |
| Gemini CLI                       | `GEMINI.md`                       | 내용을 붙여 넣거나 `@krds-vue-guidelines.md`로 가져옵니다.                       |
| Windsurf                         | `.windsurf/rules/krds-vue.md`     | 내용을 붙여 넣습니다.                                                            |

이미 같은 파일이 있으면 덮어쓰지 말고 내용을 덧붙이세요.

## AI용 문서 (llms.txt)

[llms.txt](https://llmstxt.org/) 형식으로 문서를 제공합니다. AI 도구에 주소를 알려 주거나 내려받아 맥락으로 넣으세요.

- <a href="/llms.txt" target="_blank" rel="noopener">llms.txt</a>: 가이드와 컴포넌트 문서 목차, 문서마다 한 줄 설명
- <a href="/llms-full.txt" target="_blank" rel="noopener">llms-full.txt</a>: 가이드와 모든 컴포넌트 문서를 한 파일로 (예제 코드와 Props·Events·Slots 표 포함)

## 프롬프트 예시

```text
KRDS Vue(@krds.ui/vue)로 민원 신청 페이지를 만들어 줘.
https://krds.initializer.org/ai/guidelines.md 지침을 따르고,
컴포넌트 속성·이벤트·슬롯은 https://krds.initializer.org/llms-full.txt 에서 확인해.
```

지침을 그대로 담은 실행 가능한 예제는 저장소의 [`examples/vite`](https://github.com/Initializer-org/krds-vue/tree/main/examples/vite)에서 볼 수 있습니다.
