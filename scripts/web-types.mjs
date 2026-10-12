// WebStorm 등 JetBrains IDE용 web-types(dist/web-types.json)를 만든다.
// WebStorm은 패키지 global.d.ts의 GlobalComponents 선언(tsconfig types)을 템플릿에 적용하지 않아,
// app.use(KrdsVue)로 전역 등록한 컴포넌트를 "not imported"로 표시한다. web-types에 컴포넌트를 적으면 전역 컴포넌트로 인식한다.
// 목록은 global.d.ts에서 뽑는다 (global.d.ts가 실제 내보내기와 같은지는 src/test/global-components.test.ts가 확인).
// 속성·이벤트·슬롯은 source가 가리키는 컴포넌트의 TypeScript 타입에서 IDE가 읽는다.
/* eslint-disable no-console -- CLI 스크립트 출력 */
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const { name, version } = JSON.parse(readFileSync(new URL('package.json', root), 'utf-8'))
const names = [...readFileSync(new URL('global.d.ts', root), 'utf-8').matchAll(/^ {4}(Krds\w+):/gm)].map(([, component]) => component)
if (!names.length) throw new Error('global.d.ts에서 컴포넌트를 찾지 못했습니다')

const webTypes = {
  $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
  framework: 'vue',
  name,
  version,
  'js-types-syntax': 'typescript',
  contributions: {
    html: {
      'vue-components': names.map(component => ({ name: component, source: { module: name, symbol: component } }))
    }
  }
}
writeFileSync(new URL('dist/web-types.json', root), `${JSON.stringify(webTypes, null, 2)}\n`)
console.log(`dist/web-types.json: 컴포넌트 ${names.length}개`)
