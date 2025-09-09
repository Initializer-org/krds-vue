/**
 * KRDS Vue 디렉티브 타입 정의
 */

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * 스크린 리더 전용 텍스트 디렉티브
     * 요소에 .sr-only 클래스를 추가하여 시각적으로는 숨기지만 스크린 리더에서는 읽을 수 있도록 합니다.
     */
    vSrOnly: never
  }
}

export {}
