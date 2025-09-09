/**
 * KRDS Vue 디렉티브
 */

import type { App } from 'vue'
import { vSrOnly } from './vSrOnly'

/**
 * 디렉티브 목록
 */
export const directives = {
  'sr-only': vSrOnly
} as const

/**
 * 디렉티브 설치 함수
 */
export const installDirectives = (app: App) => {
  app.directive('sr-only', vSrOnly)
}

export { vSrOnly }
export default directives
