import { readFileSync } from 'node:fs'

/** 마크다운 문단을 평문으로 */
const toPlainText = (markdown: string) =>
  markdown
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

/** 문서 파일의 제목 다음 첫 문단 (컴포넌트 설명). 메타 설명과 컴포넌트 목록에 쓴다 */
export function pageDescription(file: string): string | undefined {
  const source = readFileSync(file, 'utf-8')
  const title = /^# /m.exec(source)
  if (!title) return undefined
  const paragraph = source
    .slice(title.index)
    .split(/\n{2,}/)
    .slice(1)
    .find(block => !/^\s*(<|#|\||```|:::|- )/.test(block))
  return paragraph ? toPlainText(paragraph) : undefined
}
