import { resolve } from 'node:path'
import { defineLoader } from 'vitepress'
import { componentGroups } from '../component-groups.ts'
import { pageDescription } from '../pages.ts'

export interface ComponentListGroup {
  text: string
  pages: { name: string; link: string; description?: string }[]
}

declare const data: ComponentListGroup[]
export { data }

const docsDir = resolve(import.meta.dirname, '../..')

/** 분류별 컴포넌트 목록과 각 문서의 첫 문장 */
export default defineLoader({
  watch: ['../../components/*.md'],
  load: (): ComponentListGroup[] =>
    componentGroups.map(group => ({
      text: group.text,
      pages: group.pages.map(([name, slug]) => ({
        name,
        link: `/components/${slug}`,
        description: pageDescription(resolve(docsDir, `components/${slug}.md`))?.split(/(?<=다\.)\s/)[0]
      }))
    }))
})
