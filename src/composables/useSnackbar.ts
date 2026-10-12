import { reactive } from 'vue'

/** useSnackbar().show() 옵션 */
export interface KrdsSnackbarOptions {
  /** 메시지 제목 */
  title: string
  /** 메시지 본문 */
  message?: string
  /** 아이콘 클래스 (예: 'ico-success-fill') */
  icon?: string
  /** 작업 버튼 이름 (되돌리기·다시 시도 등 1개) */
  action?: string
  /** 작업 버튼을 눌렀을 때. 호출 뒤 스낵바를 닫는다 */
  onAction?: () => void
  /** 노출 시간(ms). 기본 0으로 닫기 버튼을 누를 때까지 둔다 */
  duration?: number
}

/** 전역 스낵바 상태. KrdsSnackbar가 읽는다 (내부용) */
export const snackbarState = reactive({
  visible: false,
  /** show()마다 증가. 떠 있는 동안 다시 띄워도 노출 시간을 다시 센다 */
  id: 0,
  options: { title: '' } as KrdsSnackbarOptions
})

/**
 * 어디서든 스낵바를 띄우는 컴포저블. App에 `<KrdsSnackbar />`를 한 번 두고 쓴다
 *
 * @example
 * ```ts
 * const snackbar = useSnackbar()
 * snackbar.show({ title: '삭제 완료', message: '항목을 삭제했습니다.', action: '되돌리기', onAction: restore })
 * ```
 */
export function useSnackbar() {
  return {
    /** 스낵바 표시 (이미 떠 있으면 내용을 바꾼다. 한 페이지에 하나만 둔다) */
    show(options: KrdsSnackbarOptions) {
      Object.assign(snackbarState, { options, visible: true, id: snackbarState.id + 1 })
    },
    /** 스낵바 닫기 */
    hide: () => (snackbarState.visible = false)
  }
}
