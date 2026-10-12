import { defineComponent, h, onMounted, ref } from 'vue'
import { toastState } from '@/composables/useToast'

/** 토스트 메시지 유형. KRDS 가이드의 노출 시간: 정보형 2~3초, 주의·경고형 3~4초 */
export type KrdsToastType = 'info' | 'warning'

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
    // 빈 영역을 먼저 문서에 넣고 다음 task부터 내용을 넣는다 (마운트 전에 띄운 메시지도 화면낭독기가 읽게)
    const ready = ref(false)
    onMounted(() => setTimeout(() => (ready.value = true)))

    return () => {
      const shown = ready.value && toastState.visible
      // show()마다 바뀌는 id를 key로 써서, 같은 메시지를 다시 띄워도 새로 그린다 (다시 읽고 등장 효과도 다시 나옴)
      return h(
        'div',
        { class: ['krds-toast', { active: shown }], role: 'status' },
        shown ? [h('p', { key: toastState.id, class: 'toast-text' }, toastState.message)] : []
      )
    }
  }
})
