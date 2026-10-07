/**
 * 컴포넌트 테스트 헬퍼
 */
import { render as renderBase } from '@testing-library/vue'
import axe from 'axe-core'
import { expect } from 'vitest'
import * as components from '@/components'
import { vSrOnly } from '@/directives'

export { screen, waitFor, within } from '@testing-library/vue'
export { default as userEvent } from '@testing-library/user-event'

type RenderParams = Parameters<typeof renderBase>

/** KRDS 컴포넌트·디렉티브를 전역 등록한 상태로 렌더 (app.use(KrdsVue)와 동일) */
export const render = (component: RenderParams[0], options: RenderParams[1] = {}) =>
  renderBase(component, {
    ...options,
    global: { components, directives: { 'sr-only': vSrOnly }, ...options.global }
  })

/** axe 규칙 설정 (원본 KRDS 마크업 유래 위반을 요소 단위로 제외할 때 selector 지정) */
export interface A11yRule {
  id: string
  selector?: string
  enabled?: boolean
}

/** 끝이 있는 애니메이션·전환이 끝날 때까지 대기 */
const waitForAnimations = () =>
  Promise.all(
    document
      .getAnimations()
      .filter(animation => animation.effect?.getComputedTiming().endTime !== Infinity)
      .map(animation => animation.finished.catch(() => undefined))
  )

/**
 * 문서 전체 접근성 검사. axe 기본 규칙에서 region만 끈다 (컴포넌트 단위 렌더에는 랜드마크가 없을 수 있음)
 */
export async function expectNoA11yViolations(rules: A11yRule[] = []) {
  await waitForAnimations()
  axe.reset()
  axe.configure({ rules: [{ id: 'region', enabled: false }, ...rules] })
  const { violations } = await axe.run(document.body)
  expect(violations.map(v => `${v.id}: ${v.nodes.map(node => node.target.join(' ')).join(' | ')}`)).toEqual([])
}
