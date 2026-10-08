import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import ts from 'typescript'
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

/** 런타임 emits 객체의 키에 단 JSDoc 설명 (vue-component-meta가 읽지 못해 직접 꺼낸다) */
const emitDescriptions = (file: string) => {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf-8'), ts.ScriptTarget.Latest, true)
  const descriptions: Record<string, string> = {}
  const visit = (node: ts.Node) => {
    if (ts.isPropertyAssignment(node) && node.name.getText(source) === 'emits' && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        const name = property.name && (ts.isStringLiteral(property.name) ? property.name.text : property.name.getText(source))
        const doc = ts
          .getJSDocCommentsAndTags(property)
          .filter(ts.isJSDoc)
          .map(jsDoc => ts.getTextOfJSDocComment(jsDoc.comment) ?? '')
          .join(' ')
          .trim()
        if (name && doc) descriptions[name] = doc
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return descriptions
}

/** 컴포넌트 소스의 props 정의·JSDoc에서 API 표를 만든다 (vue-component-meta) */
export default defineLoader({
  watch: ['../../../src/components/*/Krds*.ts'],
  load(files): Record<string, ComponentApi> {
    const checker = createChecker(resolve(root, 'tsconfig.json'), { forceUseTs: true, printer: { newLine: 1 } })
    return Object.fromEntries(
      files.map(file => {
        const meta = checker.getComponentMeta(file)
        const eventDocs = emitDescriptions(file)
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
            events: meta.events.map(event => ({
              name: event.name,
              type: event.type,
              description: event.description || (eventDocs[event.name] ?? '')
            })),
            slots: meta.slots.map(slot => ({ name: slot.name, description: slot.description }))
          }
        ]
      })
    )
  }
})
