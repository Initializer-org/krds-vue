import { basename, resolve } from 'node:path'
import { defineLoader } from 'vitepress'
import { createChecker } from 'vue-component-meta'

export interface ComponentApi {
  props: { name: string; type: string; default?: string; required: boolean; description: string }[]
  events: { name: string; type: string; description: string }[]
  slots: { name: string; description: string }[]
}

declare const data: Record<string, ComponentApi>
export { data }

const root = resolve(import.meta.dirname, '../../..')
const stripUndefined = (type: string) => type.replace(/ \| undefined$/, '')

/** 컴포넌트 소스의 props 정의·JSDoc에서 API 표를 만든다 (Storybook docgen과 같은 vue-component-meta 사용) */
export default defineLoader({
  watch: ['../../../src/components/*/Krds*.ts'],
  load(files): Record<string, ComponentApi> {
    const checker = createChecker(resolve(root, 'tsconfig.json'), { forceUseTs: true, printer: { newLine: 1 } })
    return Object.fromEntries(
      files
        .filter(file => !file.endsWith('.stories.ts'))
        .map(file => {
          const meta = checker.getComponentMeta(file)
          return [
            basename(file, '.ts'),
            {
              props: meta.props
                .filter(prop => !prop.global)
                .map(prop => ({
                  name: prop.name,
                  type: stripUndefined(prop.type),
                  default: prop.default === 'undefined' ? undefined : prop.default,
                  required: prop.required,
                  description: prop.description
                })),
              events: meta.events.map(event => ({ name: event.name, type: event.type, description: event.description })),
              slots: meta.slots.map(slot => ({ name: slot.name, description: slot.description }))
            }
          ]
        })
    )
  }
})
