import { defineComponent, h, onMounted, ref, watch } from 'vue'
import { snackbarState, useSnackbar } from '@/composables/useSnackbar'

/**
 * KRDS Snackbar 컴포넌트
 *
 * 사용자 행동의 결과를 제목·본문과 함께 화면 중앙 하단에 보여 주고, 되돌리기·다시 시도 같은 추가 행동 1개와 닫기 버튼을 둡니다.
 * App에 한 번만 두고 어디서든 `useSnackbar().show()`로 띄웁니다 (한 페이지에 하나만 표시).
 * 원본 KRDS에 구현이 없어 가이드(구조·위치)와 토큰으로 만들었습니다.
 * 화면낭독기가 읽도록 `role="status"` 영역은 항상 두고, 표시할 때만 내용을 넣습니다.
 *
 * @example
 * ```vue
 * <!-- App.vue -->
 * <KrdsSnackbar />
 *
 * <!-- 아무 컴포넌트 -->
 * const snackbar = useSnackbar()
 * snackbar.show({ icon: 'ico-success-fill', title: '삭제 완료', message: '항목을 삭제했습니다.', action: '되돌리기', onAction: restore })
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsSnackbar',
  setup() {
    const { hide } = useSnackbar()
    const root = ref<HTMLElement>()

    // 빈 영역을 먼저 문서에 넣고 다음 task부터 내용을 넣는다 (마운트 전에 띄운 스낵바도 화면낭독기가 읽게)
    const ready = ref(false)
    onMounted(() => setTimeout(() => (ready.value = true)))

    // 닫히면서 초점이 있던 버튼이 사라지면 body로 빠지므로, 스낵바로 들어오기 전 요소로 초점을 돌려준다
    let returnFocus: HTMLElement | null = null
    const onFocusin = (event: FocusEvent) => {
      const from = event.relatedTarget as HTMLElement | null
      if (!root.value?.contains(from)) returnFocus = from
    }
    watch(
      () => snackbarState.visible,
      visible => {
        if (!visible && root.value?.contains(document.activeElement)) returnFocus?.focus()
      }
    )

    // 먼저 닫고 부른다: onAction 안에서 다시 show()한 스낵바(다시 시도 → 결과)가 남고, 비동기 오류는 앱 errorHandler로 간다
    const handleAction = () => {
      const { options } = snackbarState
      hide()
      return options.onAction?.()
    }

    return () => {
      const shown = ready.value && snackbarState.visible
      const { title, message, icon, action } = snackbarState.options
      return h(
        'div',
        { ref: root, class: ['krds-snackbar', { active: shown }], role: 'status', onFocusin },
        shown
          ? [
              h('div', { class: 'snackbar-in' }, [
                icon && h('i', { class: ['svg-icon', 'snackbar-icon', icon], 'aria-hidden': 'true' }),
                // show()마다 바뀌는 id를 key로 써서, 같은 내용을 다시 띄워도 새로 그린다 (화면낭독기가 다시 읽음)
                h('div', { key: snackbarState.id, class: 'snackbar-body' }, [
                  h('strong', { class: 'snackbar-title' }, title),
                  message && h('p', { class: 'snackbar-text' }, message)
                ]),
                // 가이드의 텍스트 버튼: KRDS 버튼의 link 스타일 (파란 글자, 높이 없음)
                action && h('button', { type: 'button', class: 'krds-btn medium link snackbar-action', onClick: handleAction }, action),
                h('button', { type: 'button', class: 'krds-btn small icon snackbar-close', onClick: hide }, [
                  h('span', { class: 'sr-only' }, '닫기'),
                  h('i', { class: 'svg-icon ico-popup-close', 'aria-hidden': 'true' })
                ])
              ])
            ]
          : []
      )
    }
  }
})
