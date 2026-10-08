import { describe, expect, it } from 'vitest'
import * as components from '@/components'
import globalTypes from '../../global.d.ts?raw'

describe('global.d.ts', () => {
  it('전역 컴포넌트 타입 목록이 실제 내보내는 컴포넌트와 같음', () => {
    const declared = [...globalTypes.matchAll(/^ {4}(Krds\w+): \(typeof import\('@krds\.ui\/vue'\)\)\['(Krds\w+)'\]$/gm)]
    declared.forEach(([, key, exported]) => expect(key).toBe(exported))
    expect(declared.map(([, key]) => key).sort()).toEqual(Object.keys(components).sort())
  })
})
