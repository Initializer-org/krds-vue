/**
 * 모든 컴포넌트를 서버 렌더링해 setup·render 단계에서 throw하지 않는지 확인한다
 * (예: setup에서 document 접근). pnpm build 이후 실행: node scripts/ssr-smoke.mjs
 */
/* eslint-disable no-console -- CLI 스크립트 출력 */
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import * as lib from '../dist/krds-vue.es.js'

// Boolean props는 모두 true(열린 모달·패널 등 분기까지 렌더), 필수 배열 props는 빈 배열
const propsFor = component =>
  Object.fromEntries(
    Object.entries(component.props ?? {}).flatMap(([key, def]) =>
      def?.type === Boolean ? [[key, true]] : def?.required && def.type === Array ? [[key, []]] : []
    )
  )

const failed = new Set()
let count = 0
for (const [name, component] of Object.entries(lib)) {
  if (!name.startsWith('Krds') || typeof component !== 'object') continue
  count++
  const fail = error => failed.add(`${name}: ${error.message}`)
  const app = createSSRApp({ render: () => h(component, propsFor(component), { default: () => 'content' }) })
  app.config.warnHandler = () => {}
  // async watcher 등 render 밖에서 난 에러도 errorHandler로 모은다
  app.config.errorHandler = fail
  await renderToString(app).catch(fail)
}
await new Promise(resolve => setTimeout(resolve))

if (failed.size) {
  console.error(`SSR 렌더링 실패\n${[...failed].join('\n')}`)
  process.exit(1)
}
console.log(`SSR 렌더링 통과 ${count}개`)
