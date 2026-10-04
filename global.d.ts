/**
 * app.use(KrdsVue)로 전역 등록되는 컴포넌트·디렉티브·전역 속성 타입
 *
 * 사용: tsconfig.json의 compilerOptions.types에 "@krds.ui/vue/global" 추가
 */
import type { Directive } from 'vue'
import type * as Krds from '@krds.ui/vue'

type KrdsGlobalComponents = {
  [K in keyof typeof Krds as K extends `Krds${string}` ? K : never]: (typeof Krds)[K]
}

declare module 'vue' {
  export interface GlobalComponents extends KrdsGlobalComponents {}

  export interface GlobalDirectives {
    /** 스크린 리더 전용 텍스트 (.sr-only 클래스 추가) */
    vSrOnly: Directive<HTMLElement, boolean | undefined>
  }

  export interface ComponentCustomProperties {
    $krds: { version: string }
  }
}

export {}
