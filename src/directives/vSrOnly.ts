import type { Directive } from 'vue'

/**
 * v-sr-only 디렉티브
 * 선언하면 .sr-only 클래스 추가, 없으면 제거
 */
export const vSrOnly: Directive = {
  mounted(el: HTMLElement) {
    el.classList.add('sr-only')
  },

  unmounted(el: HTMLElement) {
    el.classList.remove('sr-only')
  }
}

export default vSrOnly
