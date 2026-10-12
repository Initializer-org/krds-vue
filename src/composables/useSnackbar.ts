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
  /** 작업 버튼을 눌렀을 때. 스낵바를 닫은 뒤 부르므로 안에서 다시 show()할 수 있다 */
  onAction?: () => void
  /** 노출 시간(ms). 기본 0으로 닫기 버튼을 누를 때까지 둔다 */
  duration?: number
}

/** 전역 스낵바 상태. KrdsSnackbar가 읽는다 (내부용) */
export const snackbarState = reactive({
  visible: false,
  /** show()마다 바뀐다. KrdsSnackbar가 key로 써서 같은 내용도 새로 그린다 (화면낭독기가 다시 읽음) */
  id: 0,
  options: { title: '' } as KrdsSnackbarOptions
})

// id는 반응형 상태를 읽지 않고 센다 (watchEffect 안에서 show()해도 그 effect가 id를 구독하지 않게)
let seq = 0
// 타이머는 컴포넌트가 아니라 여기 둔다 (KrdsSnackbar가 언마운트돼도 제때 닫힘)
let timer: ReturnType<typeof setTimeout> | undefined

const hide = () => {
  clearTimeout(timer)
  snackbarState.visible = false
}

const show = (options: KrdsSnackbarOptions) => {
  // 서버 렌더링에서는 띄우지 않는다 (모듈 전역 상태라 다른 요청에도 렌더된다)
  if (typeof document === 'undefined') return
  const duration = options.duration ?? 0
  clearTimeout(timer)
  Object.assign(snackbarState, { options, visible: true, id: ++seq })
  // duration을 주면 토스트처럼 자동으로 닫는다. 2^31ms 이상(Infinity 포함)은 setTimeout이 바로 실행하므로 닫지 않음으로 본다
  if (duration > 0 && duration < 2 ** 31) timer = setTimeout(hide, duration)
}

const snackbar = {
  /** 스낵바 표시 (이미 떠 있으면 내용을 바꾼다. 한 페이지에 하나만 둔다) */
  show,
  /** 스낵바 닫기 */
  hide
}

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
  return snackbar
}
