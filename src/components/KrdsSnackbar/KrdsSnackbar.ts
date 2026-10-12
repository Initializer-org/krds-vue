import { defineComponent, h, onUnmounted, watch } from 'vue'
import { snackbarState } from '@/composables/useSnackbar'

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
    const hide = () => (snackbarState.visible = false)

    // duration을 주면 토스트처럼 자동으로 닫는다 (기본은 닫기 버튼까지 유지)
    let timer: ReturnType<typeof setTimeout> | undefined
    watch(
      () => [snackbarState.visible, snackbarState.id],
      () => {
        clearTimeout(timer)
        const duration = snackbarState.options.duration ?? 0
        if (snackbarState.visible && duration > 0) timer = setTimeout(hide, duration)
      },
      { immediate: true }
    )
    onUnmounted(() => clearTimeout(timer))
    const handleAction = () => {
      snackbarState.options.onAction?.()
      hide()
    }

    return () => {
      const { title, message, icon, action } = snackbarState.options
      return h(
        'div',
        { class: ['krds-snackbar', { active: snackbarState.visible }], role: 'status' },
        snackbarState.visible
          ? [
              h('div', { class: 'snackbar-in' }, [
                icon && h('i', { class: ['svg-icon', 'snackbar-icon', icon], 'aria-hidden': 'true' }),
                h('div', { class: 'snackbar-body' }, [
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
