import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { componentGroups } from './component-groups.ts'
import { pageDescription } from './pages.ts'
import componentMeta from './theme/component-meta.data.ts'
import type { ComponentApi } from './theme/component-meta.data.ts'

/** Cursor 규칙 파일: 항상 적용되도록 frontmatter를 붙인 지침 (원본은 docs/public/ai/guidelines.md 하나) */
export const cursorRule = (srcDir: string) =>
  `---\ndescription: KRDS Vue(@krds.ui/vue)로 화면을 만들 때 따를 지침\nalwaysApply: true\n---\n\n${readFileSync(resolve(srcDir, 'public/ai/guidelines.md'), 'utf-8')}`

/**
 * AI 도구용 파일을 빌드 결과에 쓴다.
 * - llms.txt: 문서 목차와 설명 (llmstxt.org 형식)
 * - llms-full.txt: 가이드와 컴포넌트 문서 전체 (예제 코드와 Props·Events·Slots 표 포함)
 * - ai/krds-vue.mdc: Cursor 규칙 파일
 */
export const writeAiFiles = async (srcDir: string, outDir: string, siteUrl: string) => {
  const root = resolve(srcDir, '..')
  const files = componentGroups.flatMap(group => group.pages.map(([, slug]) => `components/${slug}.md`))
  const metaFiles = [
    ...new Set(
      files.flatMap(file =>
        [...readFileSync(resolve(srcDir, file), 'utf-8').matchAll(/<ComponentApi name="(\w+)"/g)].map(([, name]) => name)
      )
    )
  ]
  const meta = (await componentMeta.load(metaFiles.map(name => resolve(root, `src/components/${name}/${name}.ts`)))) as Record<
    string,
    ComponentApi
  >
  const aliases = typeAliases(resolve(root, 'src'))

  const link = (file: string) => `${siteUrl}/${file.replace(/\.md$/, '')}`
  const guides = [
    ['시작하기', 'guide/getting-started.md'],
    ['AI로 개발하기', 'guide/ai.md']
  ]

  const index = [
    '# KRDS Vue',
    '',
    '> 대한민국 정부 디자인 시스템(KRDS)을 Vue 3와 TypeScript로 구현한 컴포넌트 라이브러리(@krds.ui/vue) 문서입니다.',
    '',
    `- 전체 문서: ${siteUrl}/llms-full.txt`,
    `- AI 개발 지침: ${siteUrl}/ai/guidelines.md`,
    '',
    '## 가이드',
    '',
    ...guides.map(([text, file]) => `- [${text}](${link(file)}): ${pageDescription(resolve(srcDir, file)) ?? ''}`),
    '',
    '## 컴포넌트',
    ...componentGroups.flatMap(group => [
      '',
      `### ${group.text}`,
      '',
      ...group.pages.map(
        ([name, slug]) =>
          `- [${name}](${link(`components/${slug}.md`)}): ${pageDescription(resolve(srcDir, `components/${slug}.md`)) ?? ''}`
      )
    ])
  ]

  const full = [
    index.slice(0, 3).join('\n'),
    toPlain(resolve(srcDir, 'guide/getting-started.md'), meta, aliases),
    ...files.map(file => toPlain(resolve(srcDir, file), meta, aliases))
  ]

  writeFileSync(resolve(outDir, 'llms.txt'), `${index.join('\n')}\n`)
  writeFileSync(resolve(outDir, 'llms-full.txt'), `${full.join('\n\n---\n\n')}\n`)
  writeFileSync(resolve(outDir, 'ai/krds-vue.mdc'), cursorRule(srcDir))
}

const cell = (text = '') => text.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ') || '-'

/** 문자열 값으로만 된 타입 별칭 (예: type Size = 'small' | 'medium'). API 표에 별칭 이름만 있으면 값을 알 수 없어 함께 적는다 */
const typeAliases = (srcRoot: string) => {
  const aliases: Record<string, string> = {}
  for (const entry of readdirSync(srcRoot, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.ts')) continue
    const source = readFileSync(resolve(entry.parentPath, entry.name), 'utf-8')
    for (const [, name, value] of source.matchAll(/^(?:export )?type (\w+) = ('[^'\n]*'(?:\s*\|\s*'[^'\n]*')*)$/gm)) {
      aliases[name] = value
    }
  }
  return aliases
}
const withAliases = (type: string, aliases: Record<string, string>) =>
  type.replace(/\b[A-Z]\w*\b/g, name => (aliases[name] ? `${name} (${aliases[name]})` : name))

/** <ComponentApi name="X" />를 Props·Events·Slots 표로 */
const apiTables = ({ props, events, slots }: ComponentApi, aliases: Record<string, string>) =>
  [
    '### Props',
    '',
    ...(props.length
      ? [
          '| 이름 | 타입 | 기본값 | 설명 |',
          '| --- | --- | --- | --- |',
          ...props.map(
            p =>
              `| ${p.name}${p.required ? ' (필수)' : ''} | ${cell(withAliases(p.type, aliases))} | ${cell(p.default)} | ${cell(p.description)} |`
          )
        ]
      : ['없음']),
    ...(events.length
      ? [
          '',
          '### Events',
          '',
          '| 이름 | 인자 | 설명 |',
          '| --- | --- | --- |',
          ...events.map(e => `| ${e.name} | ${cell(e.type)} | ${cell(e.description)} |`)
        ]
      : []),
    ...(slots.length
      ? ['', '### Slots', '', '| 이름 | 설명 |', '| --- | --- |', ...slots.map(s => `| ${s.name} | ${cell(s.description)} |`)]
      : [])
  ].join('\n')

/** 문서 마크다운을 AI가 읽을 평문 마크다운으로: 스크립트·예제 띄우기 태그를 빼고, 예제 파일과 API 표를 펼친다 */
const toPlain = (file: string, meta: Record<string, ComponentApi>, aliases: Record<string, string>) => {
  let inFence = false
  const lines = readFileSync(file, 'utf-8')
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/<script setup>[\s\S]*?<\/script>\n*/, '')
    .split('\n')
    .flatMap(line => {
      if (line.startsWith('```')) inFence = !inFence
      if (inFence) return [line]
      const snippet = line.match(/^<<< (\.\/\S+\.vue)$/)
      if (snippet) return ['```vue', readFileSync(resolve(dirname(file), snippet[1]), 'utf-8').trimEnd(), '```']
      const api = line.match(/^<ComponentApi name="(\w+)" \/>$/)
      if (api) return [meta[api[1]] ? apiTables(meta[api[1]], aliases) : '']
      // 예제를 화면에 띄우는 태그(<div class="demo …">, <DemoFrame />, 그 밖의 문서 전용 컴포넌트)와 ::: 컨테이너 표시는 뺀다
      if (/^\s*<(div class="demo|DemoFrame|[A-Z]\w*[\s/>])/.test(line) || line.startsWith(':::')) return []
      return [line]
    })
  return lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
