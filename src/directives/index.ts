/**
 * KRDS Vue 디렉티브 (최소 구현)
 */

import type { App } from 'vue'

/**
 * 빈 디렉티브 객체 (원본 KRDS에 디렉티브가 없음)
 */
export const directives = {} as const

/**
 * 디렉티브 설치 함수 (빈 구현)
 */
export const installDirectives = (_app: App) => {
  // 원본 KRDS에 커스텀 디렉티브가 없으므로 빈 구현
}

export default directives
