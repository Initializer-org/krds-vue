import { reactive } from 'vue'
import type { KrdsToastType } from '@/components/KrdsToast/KrdsToast'

/** useToast().show() 옵션 */
export interface KrdsToastOptions {
  /** 메시지 유형. 기본 노출 시간을 정한다 (`info` 3초, `warning` 4초) */
  type?: KrdsToastType
  /** 노출 시간(ms). 0이면 자동으로 닫지 않는다 */
  duration?: number
}

/** 유형별 기본 노출 시간(ms). KRDS 가이드: 정보형 2~3초, 주의·경고형 3~4초 */
const DEFAULT_DURATION: Record<KrdsToastType, number> = { info: 3000, warning: 4000 }

/** 전역 토스트 상태. KrdsToast가 읽는다 (내부용) */
export const toastState = reactive({
  visible: false,
  /** show()마다 바뀐다. KrdsToast가 key로 써서 같은 메시지도 새로 그린다 (화면낭독기가 다시 읽음) */
  id: 0,
  message: ''
})

// id는 반응형 상태를 읽지 않고 센다 (watchEffect 안에서 show()해도 그 effect가 id를 구독하지 않게)
let seq = 0
// 타이머는 컴포넌트가 아니라 여기 둔다 (KrdsToast가 언마운트돼도 제때 닫힘)
let timer: ReturnType<typeof setTimeout> | undefined

const hide = () => {
  clearTimeout(timer)
  toastState.visible = false
}

const show = (message: string, options: KrdsToastOptions = {}) => {
  // 서버 렌더링에서는 띄우지 않는다 (모듈 전역 상태라 다른 요청에도 렌더된다)
  if (typeof document === 'undefined') return
  const duration = options.duration ?? DEFAULT_DURATION[options.type ?? 'info']
  clearTimeout(timer)
  Object.assign(toastState, { message, visible: true, id: ++seq })
  // 2^31ms 이상(Infinity 포함)은 setTimeout이 바로 실행하므로 닫지 않음으로 본다
  if (duration > 0 && duration < 2 ** 31) timer = setTimeout(hide, duration)
}

const toast = {
  /** 토스트 표시 (떠 있으면 메시지를 바꾸고 노출 시간을 다시 센다) */
  show,
  /** 정보형 토스트 (3초): 인증·저장·업로드 완료 등 */
  info: (message: string, duration?: number) => show(message, { type: 'info', duration }),
  /** 주의·경고형 토스트 (4초): 인증·저장·업로드 실패 등 */
  warning: (message: string, duration?: number) => show(message, { type: 'warning', duration }),
  /** 토스트 닫기 */
  hide
}

/**
 * 어디서든 토스트를 띄우는 컴포저블. App에 `<KrdsToast />`를 한 번 두고 쓴다
 *
 * @example
 * ```ts
 * const toast = useToast()
 * toast.show('저장되었습니다.')
 * toast.warning('임시 저장에 실패했습니다.')
 * ```
 */
export function useToast() {
  return toast
}
