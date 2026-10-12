import { defineComponent, h, onUnmounted, watch } from 'vue'
import { toastState } from '@/composables/useToast'

/** 토스트 메시지 유형. KRDS 가이드의 노출 시간: 정보형 2~3초, 주의·경고형 3~4초 */
export type KrdsToastType = 'info' | 'warning'

/** 유형별 기본 노출 시간(ms) */
const DEFAULT_DURATION: Record<KrdsToastType, number> = { info: 3000, warning: 4000 }

/**
 * KRDS Toast 컴포넌트
 *
 * 사용자 행동의 결과를 화면 중앙 하단에 한 줄로 잠시 보여 주고 사라지는 알림입니다.
 * App에 한 번만 두고 어디서든 `useToast().show()`로 띄웁니다.
 * 원본 KRDS에 구현이 없어 가이드(구조·위치·노출 시간)와 토큰으로 만들었습니다.
 * 화면낭독기가 읽도록 `role="status"` 영역은 항상 두고, 표시할 때만 메시지를 넣습니다.
 *
 * @example
 * ```vue
 * <!-- App.vue -->
 * <KrdsToast />
 *
 * <!-- 아무 컴포넌트 -->
 * const toast = useToast()
 * toast.show('저장되었습니다.')
 * toast.show('임시 저장에 실패했습니다.', { type: 'warning' })
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsToast',
  setup() {
    let timer: ReturnType<typeof setTimeout> | undefined
    // show()마다 바뀌는 id도 감시해, 떠 있는 동안 다시 띄우면 노출 시간을 다시 센다
    watch(
      () => [toastState.visible, toastState.id],
      () => {
        clearTimeout(timer)
        const duration = toastState.duration ?? DEFAULT_DURATION[toastState.type]
        if (toastState.visible && duration > 0) timer = setTimeout(() => (toastState.visible = false), duration)
      },
      { immediate: true }
    )
    onUnmounted(() => clearTimeout(timer))

    return () =>
      h(
        'div',
        { class: ['krds-toast', { active: toastState.visible }], role: 'status' },
        toastState.visible ? [h('p', { class: 'toast-text' }, toastState.message)] : []
      )
  }
})
