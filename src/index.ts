/**
 * KRDS Vue 디자인 시스템
 * 대한민국 정부 표준 디자인 시스템 Vue 3 구현체
 *
 * @packageDocumentation
 */

import type { App, Plugin } from 'vue'

// 컴포넌트 imports
import * as components from './components'

// 디렉티브 imports
import * as directives from './directives'

// 컴포저블 exports
export * from './composables'

// 유틸리티 exports
export * from './utils'

// 타입 exports
export * from './types'

// 토큰 exports
export * from './tokens'

// 개별 컴포넌트 export
// export * from './components'

/**
 * KRDS Vue 플러그인 설정 옵션
 */
export interface KrdsVueOptions {
  /** 설치할 컴포넌트 목록 (비어있으면 전체 설치) */
  components?: string[]
}

/**
 * KRDS Vue 플러그인
 */
const KrdsVue: Plugin = {
  install(app: App, options: KrdsVueOptions = {}) {
    // 기본 옵션 설정
    const defaultOptions: KrdsVueOptions = {}

    // 옵션 병합
    const finalOptions = {
      ...defaultOptions,
      ...options
    }

    // 전역 설정 제공
    app.provide('krds:config', finalOptions)

    // 컴포넌트 등록
    const componentsToInstall = options.components || Object.keys(components)

    componentsToInstall.forEach(componentName => {
      const component = (components as Record<string, unknown>)[componentName]
      if (component) {
        app.component(componentName, component)
      }
    })

    // 디렉티브 등록
    if (typeof directives === 'object' && directives !== null && 'installDirectives' in directives) {
      ;(directives as { installDirectives: (app: App) => void }).installDirectives(app)
    }

    // 전역 속성 추가
    app.config.globalProperties.$krds = {
      version: '__VERSION__'
    }

    // 개발 모드에서 설치 로그
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[KRDS Vue] v__VERSION__ 설치 완료 - 컴포넌트: ${componentsToInstall.length}개`)
    }
  }
}

export default KrdsVue

// 버전 정보
export const version = '__VERSION__'
