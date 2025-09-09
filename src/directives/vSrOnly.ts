import type { Directive } from 'vue'

/**
 * v-sr-only 디렉티브
 * 선언하면 .sr-only 클래스 추가, 없으면 제거
 */
export const vSrOnly: Directive<HTMLElement, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value !== false) {
      el.classList.add('sr-only')
    }
  },

  updated(el, binding) {
    if (binding.value === false) {
      el.classList.remove('sr-only')
    } else {
      el.classList.add('sr-only')
    }
  },

  unmounted(el) {
    el.classList.remove('sr-only')
  }
}

export default vSrOnly
